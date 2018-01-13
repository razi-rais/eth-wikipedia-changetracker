# Note this app and the documentation are currently in progress - Jan 2018

# About
The purpose of the Wikipedia Changetracker app is to allow users to save the URL of Wikipedia pages and track the changes to those pages.  All of the watched pages will show up on the user's dashboard with an indication and list of the most recent changes, since the page has been tracked by our app.  We are utilizing Wikipedia's APIs in order to check all of the latest edits to articles. 

The project is composed of an Angular front end, python API projects, an Azure SQL backend, and an Ethereum Blockchain. Here is a breakdown of the folder structure of the project: 
* The Contract folder contains the Solidity contract for the blockchain.  We recommend using Remix the Solidity IDE (https://remix.ethereum.org) if you would like to test out how to deploy contracts.  
* The WikiBlockApi project interacts with the blockchain and helps keep track of the recording of updates and raising events from the blockchain. 
* The WikiChangeAngular project is the front end Angular project that users will interact with.  
* The WikiChangeTracker pulls all of the articles users are interested in from the SQL database and checks to see if they correlate with any of the recent updates to Wikipedia as a whole. 
* The WikiItemsApi has a GET for getting articles by User Id that the WikiChangeTracker pulls from.  It also has a POST for saving Wikipedia pages to users which is utilized by the front end project. 

The SQL database will keep all of the user information, article information (URL and title), and the association of users to their articles (which articles belong to which users). The Blockchain will keep track of all the updates that have occurrred to a particular article and has an event system implemented which will be raised when an new update to a certain article a user is interested in is changed. 

This project was created by Razi Rais, Crystal Tenn, and Viktor Dikov. 

# App Walkthrough
1. When you first open the app, if you are logged in, you will see a Dashboard page with any Wikipedia articles you have saved.  This will be empty if you have no saved any. 
2. If you click on the Watch button, you can choose to add a Wikipedia URL.  For example, try to add the following URL: 
3. Now go back to the Dashboard page

# Setup Instructions 
Setup instructions will be broken down by different environments.  The project was built in Python so it would be more cross platform. If you would like to use a VM to ensure everything is in a clean environment, we have an Azure ARM template that you can deploy with easily just by clicking below.  Otherwise, you are welcome to use your local machines.  You do not need to use Visual Studio or Visual Studio Code if you have another IDE in mind.   

## Windows 10 / Windows Server 2016 / Visual Studio / Visual Studio Code
1. Download the project as a zip file or using Git. 
2. 
3. Create a local SQL Server or Azure SQL Server.
4. Create a SQL database. 
5. Add the connection string to.. 

## Linux / 

## Setup Rinkeby and get free ether
1. Install geth.
2. Open up a command line (we will refer to this as command window #1) and run the following (replace path with the path where your geth.exe file lives): 
   ```
   path/geth.exe --rinkeby --rpc --rpcapi db,eth,net,web3,personal --cache=2048  --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*"
   ```
      ![Alt text](/DocumentationImages/Rinkeby/1-geth.jpg?raw=true)
      *Wait around 30 minutes for geth to download history onto your local machine (from this command window), just keep it open while you complete the other steps.*
3. Open a second command line (we will call this command window #2). Run the following (replace path with the path where your geth.exe file lives): 
   ```
   path/geth.exe attach
   ```
   ![Alt text](/DocumentationImages/Rinkeby/2-geth-attach.jpg?raw=true)
4. Run the command: 
   ```
   personal.newAccount('passwordhere')
   ```
   ![Alt text](/DocumentationImages/Rinkeby/3-newaccount.jpg?raw=true)
5. Run the following: 
   ```
   personal.listAccounts
   ```
   ![Alt text](/DocumentationImages/Rinkeby/4-listaccounts.jpg?raw=true)
6. Get the account ID from the command above (in green text in screenshot above) and save this in a Notepad.
7. Go to the following URL: https://www.rinkeby.io/#faucet
   ![Alt text](/DocumentationImages/Rinkeby/5-rinkeby.jpg?raw=true)
8. Click on the "Tweet" link and paste your account ID into the 0x00000000... and Tweet it to your Twitter account. 
   ![Alt text](/DocumentationImages/Rinkeby/6-tweet.jpg?raw=true)
9. Copy the URL off Twitter.
   ![Alt text](/DocumentationImages/Rinkeby/7-twitter.jpg?raw=true)
10. Copy the Tweet's URL into the the input box and click Give me Ether. 
    ![Alt text](/DocumentationImages/Rinkeby/8-twitterurlrinkeby.jpg?raw=true)
11. Click on the Block Explorer tab. Paste your account on the search box on the top right. 
   ![Alt text](/DocumentationImages/Rinkeby/9-blockexplorer.jpg?raw=true)
12. You should see your account page on Rinkeby. 
   ![Alt text](/DocumentationImages/Rinkeby/10-rinkebyaccount.jpg?raw=true)

Open Metamask
1. Open Remix (Solidity IDE) in Chrome. Copy and paste the solidity contract into Remix. 
   ![Alt text](/DocumentationImages/Metamask/1-remix.jpg?raw=true)
2. Open Chrome and your MetaMask extension.

   ![Alt text](/DocumentationImages/Metamask/2-metamask.jpg?raw=true)
3. Click on the person icon

   ![Alt text](/DocumentationImages/Metamask/personicon.jpg?raw=true)
4. Choose import account

   ![Alt text](/DocumentationImages/Metamask/3-import.jpg?raw=true)
5. In command window #2, type in: 
   ```
   personal
   ```
6. This will list all the info about the account and will get you the location of the JSON for your account import. It should be a path similar to this one: C:\Users\super\AppData\Roaming\Ethereum\rinkeby\keystore
   ![Alt text](/DocumentationImages/Metamask/5-localpath.jpg?raw=true)
7. Go back to Chrome and Metamask.  In your metamask import screen, add the JSON file from the path you got in the previous steps. This will import your account.

   ![Alt text](/DocumentationImages/Metamask/4-json.jpg?raw=true)
   ![Alt text](/DocumentationImages/Metamask/6-jsonfile.jpg?raw=true)
 
8. On the command window #1, type exit, then run the command again (change the path to your path): 
   ```
   path/geth.exe --rinkeby --rpc --rpcapi db,eth,net,web3,personal --cache=2048  --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*"
   ```
9. Now, refresh Chrome with the Solidity page.
10. Open MetaMask and choose the Rinkeby Test Network. 
   ![Alt text](/DocumentationImages/Metamask/8-rinkebytestnet.jpg?raw=true)
11. In the Solidity page, after the contract compile, hit Run and choose Integrated Web 3. Hit Create. Give time for the transaction to go through. 
   ![Alt text](/DocumentationImages/Metamask/7-integrated-web3.jpg?raw=true)
12. Open MetaMask up and you should see the account you created (should be same contract ID).
   ![Alt text](/DocumentationImages/Metamask/9-accountbalance.jpg?raw=true) 
13. Once it is done, go to Rinkeby and check for a transaction by going to the Block Explorer and searching for your Contract ID. 
   ![Alt text](/DocumentationImages/Metamask/10-contractcreation.jpg?raw=true)

### Virtual Machine - Windows Server 2016/ Windows 10

### Virtual Machine - Azure (ARM Template - Windows Server 2016)

# Architecture Diagram
TODO


