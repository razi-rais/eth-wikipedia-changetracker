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
1. Download the project as a zip file or using Git. 
2. 
TODO

## Windows 10 / Windows Server 2016
TODO

### Virtual Machine - Windows Server 2016/ Windows 10

### Virtual Machine - Azure (ARM Template - Windows Server 2016)

# Architecture Diagram
TODO


