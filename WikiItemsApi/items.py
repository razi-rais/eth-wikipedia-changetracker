import json
import sys
import pyodbc
from flask import request, url_for, jsonify
from flask_api import FlaskAPI, status, exceptions
from flask_cors import CORS

app = FlaskAPI(__name__)
CORS(app) 

def create_message(msg,code):
    message = {
            'status': code,
            'message': str(msg),
    }
    resp = jsonify(message)
    resp.status_code = code

    return resp
        
@app.route("/api/Articles", methods=['POST'])
def save_article():
    
   if request.method == 'POST':
     
    data = request.json
   
    user_id = data["UserID"]
    cnxn = get_sqlcon()
    cursor = cnxn.cursor()
     
    for i in data['Articles']:
         print (i['id'])
         cursor.execute("SELECT  [ArticleID] ,[Title] ,[Url] ,[UserID] FROM [Articles] WHERE  [UserID] = '"+ user_id+"' AND [ArticleID] = '"+i["id"]+"'")
         row = cursor.fetchone()
         article_id = i['id']
         title = i['title']
         url = i['url']
 
         if row is None:
             cursor.execute("INSERT INTO [Articles] ([ArticleID] ,[Title] ,[Url] ,[UserID]) VALUES ('"+article_id+"' ,'"+title+"' ,'"+url+"' , '"+user_id +"');")
         else:
            cursor.execute("UPDATE [Articles] SET [ArticleID] = '"+article_id+"' , [Title]='"+title+"' , [Url]='"+url+"' WHERE [UserID] = '"+user_id +"';")
    
   cnxn.commit()

   return create_message("Item added/updated successfully",200);

@app.route("/api/Articles", methods=['GET'])
def get_articles_by_userid():
  
  if request.method == 'GET':
       
    user_id = request.args.get('userID')
    cnxn = get_sqlcon()
    cursor = cnxn.cursor()
    cursor.execute("SELECT  [ArticleID] ,[Title] ,[Url] ,[UserID] FROM [Articles] WHERE  [UserID] = '"+ user_id+"'")
    row = cursor.fetchone()
    
    data = []

    while row:
        item = {"id" : str(row[0]), "title" : str(row[2]), "url" : str(row[3])} 
        row = cursor.fetchone()
        data.append(item)
        
    json_data = json.dumps(data)
    return create_message(json_data,200)

@app.route("/api/GetArticleIdByUri", methods=['GET'])
def get_articleID_by_uri():

    article_id = ""
    if request.method == 'GET':

        uri = user_id = request.args.get('articleUri')
        cnxn = get_sqlcon()
        cursor = cnxn.cursor()
        query = "SELECT  [ArticleID] FROM [Articles] WHERE  [Url] = '"+uri.replace("'", "''")+"'";
        cursor.execute(query)
        row = cursor.fetchone()
         
        while row:
          article_id = str(row[0])
          row = cursor.fetchone()

    #json_data = json.dumps("[{"+str(article_id )+ "}]")
    return article_id

def get_sqlcon():
    server = sys.argv[1]
    database = sys.argv[2]
    username = sys.argv[3]
    password = sys.argv[4]
    driver= '{ODBC Driver 13 for SQL Server}'
    conn = pyodbc.connect('DRIVER='+driver+';PORT=1433;SERVER='+server+';PORT=1443;DATABASE='+database+';UID='+username+';PWD='+ password)
    
    return conn;

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
