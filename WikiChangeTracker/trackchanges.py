import json
import sys
import requests
from sseclient import SSEClient

blockchain_api_url = sys.argv[1]
data_api_url = sys.argv[2]
wiki_recent_changes_event_url = sys.argv[3]

items = {}
def get_wiki_changes(wiki_recent_changes_url = wiki_recent_changes_event_url):
    messages = SSEClient(wiki_recent_changes_url)
    for msg in messages:
        str = msg.data
        if  len(str.strip()) >0: 
            #print(str)
            json_obj = json.loads(str)
            if len(json_obj) > 0:
                 
                 #get_articleID_by_uri(json_obj['meta']['uri'])
                 if(check_conditions(json_obj['type'],json_obj['bot'])):

                    article_uri =  json_obj['meta']['uri']
                    
                    result = requests.get(data_api_url+article_uri)
                    article_id = result.content
                    status_code = result.status_code
                    if(result.status_code == 200 and len(article_id) > 0):
                    # type is edit | log | categorize 
                        print(json_obj)
                        items['id']=  article_id
                        items['request_id']=  json_obj['meta']['request_id']
                        items['title']=  json_obj['title']
                        items['comment']=  json_obj['comment']
                        items['revision_old']=  json_obj['revision']['old']
                        items['revision_new']=  json_obj['revision']['new']
                        items['timestamp']=  json_obj['timestamp']
                        items['change_type']=  json_obj['type']
                        items['user']=  json_obj['user']
                        items['uri']= json_obj['meta']['uri']
                        json_data = json.dumps(items)
                        result = requests.post(blockchain_api_url,json=json_data)
    return;

def check_conditions(article_type, isBot):

    if (article_type == "edit" and isBot == False):
          return True 

    return False

get_wiki_changes()