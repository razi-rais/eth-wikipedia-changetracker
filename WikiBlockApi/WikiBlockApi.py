import json
import sys
import base64
from flask import request, url_for, jsonify
from flask_api import FlaskAPI, status, exceptions
from flask_cors import CORS
import web3
from web3 import Web3, HTTPProvider

app = FlaskAPI(__name__)
CORS(app) 

web3_url= sys.argv[1]
account = sys.argv[2]
contract_address = sys.argv[3]
password = ""
#Password is blank for test-rpc othwerwise should always be provided
if len(sys.argv[4]) > 0:
    password = sys.argv[4]


abi = json.loads('[{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"request_id","type":"string"},{"name":"title","type":"string"},{"name":"url","type":"string"},{"name":"revision_old","type":"uint256"},{"name":"revision_new","type":"uint256"},{"name":"timestamp","type":"uint256"},{"name":"change_type","type":"string"},{"name":"user","type":"string"},{"name":"comment","type":"string"}],"name":"UpdateArticleHistory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"address"},{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"title","type":"string"},{"indexed":false,"name":"url","type":"string"},{"indexed":false,"name":"revision_old","type":"uint256"},{"indexed":false,"name":"revision_new","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"change_type","type":"string"},{"indexed":false,"name":"user","type":"string"},{"indexed":false,"name":"comment","type":"string"}],"name":"articleUpdateEvent","type":"event"}]')
gas = 100000

def create_message(msg,code):
    message = {
            'status': code,
            'message': str(msg),
    }
    resp = jsonify(message)
    resp.status_code = code
    return resp
        
@app.route("/", methods=['POST'])
def update_article():
    
   if request.method == 'POST':

    data = json.loads(request.json)
    web3 = Web3(HTTPProvider(web3_url))
    
    if  len(password) > 0:
        web3.personal.unlockAccount(account,password)
    
    wiki_contract = web3.eth.contract(contract_address,abi=abi)
    tx_receipt = ""
    try:
        id = int(data['id'])
        balance = web3.eth.getBalance(account)
        tx_receipt = wiki_contract.transact({'from': account, 'gas': gas}).UpdateArticleHistory(id,
                                                                                                base64.b64encode(data['request_id'].encode('utf-8')),
                                                                                                base64.b64encode(data['title'].encode('utf-8')),
                                                                                                base64.b64encode(data['uri'].encode('utf-8')),
                                                                                                data['revision_old'],
                                                                                                data['revision_new'],
                                                                                                data['timestamp'],
                                                                                                base64.b64encode(data['change_type'].encode('utf-8')),
                                                                                                base64.b64encode(data['user'].encode('utf-8')),
                                                                                                base64.b64encode(data['comment'].encode('utf-8')))
        print("tx receipt: ",tx_receipt)
    except:
         print("Unexpected error:", sys.exc_info()[0])
  
   return create_message(tx_receipt,200);

 
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8081)
