# Windows Application Setup
Now that you have either setup your local Windows machine or a Windows Server VM, please complete the following instructions to get the application running.  We will first setup the back-end application, then continue to the front-end. 

## Opening & Running the Back-end Application
These steps will show usage with Visual Studio as the IDE, however you can use any IDE you like and do equivalent steps and use this as a guide. 

1. Open the WikiChangeTracker.sln in Visual Studio (or open projects in another IDE).
2. You will see the following projects:

3. Right click properties and ensure these are the startup projects.

4. Select Multiple startup projects and select the Action for all 3 to Start. Click OK. 

5. Right-click the WikiChangeTracker project and select Properties. On the modal, select Debug and look at Script Arguments. Add the following to Script Arguments: `"http://localhost:8081/" "http://localhost:8080/api/GetArticleIdByUri?articleUri=" "https://stream.wikimedia.org/v2/stream/recentchange"`

6. Right-click the WikiItemsApi project and select Properties. On the modal, select Debug and look at Script Arguments. Add the following to Script Arguments and fill them in with your Azure SQL or local credentials: `"URL or Local DB path" "DatabaseName" "SQLUsername" "SQLPassword"`

7. We need to deploy our contract now using the web Remix IDE. 

8. 

9. Right-click the WikiBlockApi project and select Properties. On the modal, select Debug and look at Script Arguments. Add the following to Script Arguments (leave the first value, the second replace with your contract ID, the third is the account address, and the fourth is the password you setup for the account): "http://127.0.0.1:8545" "0x63825D2448Ae9175B84b04b4DB8Fe4f35ef7B8De" "0xCb0C4471a93c7955177e4E6e4cC71f8dFf5E6DDA" "asdf" 

5. Click Run or press F5.

## Opening & Running the Front-end Application
#### Front-end first time setup: 
1. Install https://nodejs.org/en/
2. Run `npm install @angular/cli -g`

#### Front-end general every time setup:
1. Open Visual Studio Code.
2. In Visual Studio Code, open a folder, navigate to this downloaded project, open the folder called: WikiChangeAngular
3. Open the Terminal
4. Run `npm install` inside the Terminal in the WikiChangeAngular folder.
5. Run `npm start`
6. Open your browser on http://localhost:4200/ 

## Opening & Running the Front-end Application

C:\ethereum\geth-windows-amd64-1.7.2-1db4ecdc\geth.exe attach

C:\ethereum\geth-windows-amd64-1.7.2-1db4ecdc\geth.exe --rinkeby --rpc --rpcapi db,eth,net,web3,personal --cache=2048 --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*"

Once your front-end and back-end are setup, [click here to go setup Rinkeby.](https://github.com/razi-rais/eth-wikipedia-changetracker/blob/master/Documentation/Setup.md)
