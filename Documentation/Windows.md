# Start Here, Choose Your OS, and Install Required Software: 
Please complete the setup of either of the below options. One is for your local Windows machine. The other option is to make a VM on Azure. 
* [Windows / Visual Studio Setup](https://github.com/razi-rais/eth-wikipedia-changetracker/blob/master/Documentation/WindowsSetup.md) - Choose this if you are a Windows user and want to set this up using your local machine. 
* [Azure VM - Windows Server 2016](https://github.com/razi-rais/eth-wikipedia-changetracker/blob/master/Documentation/VMSetup.md) - Choose this if you prefer to complete this tutorial using an Azure VM.  We will provide an ARM template for easy VM setup with a couple of clicks.  It will have a clean environment and be separate from your local machine, all you need to do is RDP in.  

# Setup Rinkeby and Get Free Ether
1. Open up a command line (we will refer to this as command window #1)
2. Run the following (replace path with the path where your geth.exe file lives): 
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
6. Get the account ID from the command above (in green text in screenshot above) and save the account ID and Password in a Notepad.
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

# Using Remix and Metamask
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
11. In the Solidity page, after the contract compile, hit Run and choose Integrated Web3. Hit Create. Give time for the transaction to go through (you can click on the screenshot below if you need to see a larger version of it in a new tab). 
   ![Alt text](/DocumentationImages/Metamask/7-integrated-web3.jpg?raw=true)
12. Open MetaMask up and you should see the account you created (should be same contract ID).
   ![Alt text](/DocumentationImages/Metamask/9-accountbalance.jpg?raw=true) 

13. Immediately after hitting Create, you can see your Contract ID in Remix here, just hit the little copy icon with the red arrow on it in the screenshot.  In your Notepad with the account and password, please add the Contract ID, we will need all of those later:
   ![Alt text](/DocumentationImages/Rinkeby/RinkebyContractId1.jpg?raw=true)
   
14. Once it is done, go to Rinkeby and check for a transaction by going to the Block Explorer and searching for your Contract ID. If you ever forget your Contract ID, you can retrieve it from Rinkeby by clicking Contract Creation here:
   ![Alt text](/DocumentationImages/Metamask/10-contractcreation.jpg?raw=true)
16. Then on the next page it will be displayed here: 
   ![Alt text](/DocumentationImages/Rinkeby/RinkebyContractId3.jpg?raw=true)
   
## Opening & Running the Back-end Application
These steps will show usage with Visual Studio as the IDE, however you can use any IDE you like and do equivalent steps and use this as a guide. 

1. Open the WikiChangeTracker.sln in Visual Studio (or open projects in another IDE).
2. You will see the following projects:

  ![Alt text](/DocumentationImages/Setup/SolutionExplorer.jpg?raw=true)
  
3. Right click properties and ensure these are the startup projects.
  ![Alt text](/DocumentationImages/Setup/setstartup.jpg?raw=true)

4. Select Multiple startup projects and select the Action for all 3 to Start. Click OK. 
  ![Alt text](/DocumentationImages/Setup/startupprojects.jpg?raw=true)
5. Right-click the WikiChangeTracker project and select Properties. On the modal, select Debug and look at Script Arguments. Add the following to Script Arguments: `"http://localhost:8081/" "http://localhost:8080/api/GetArticleIdByUri?articleUri=" "https://stream.wikimedia.org/v2/stream/recentchange"`
  ![Alt text](/DocumentationImages/Setup/wikichangetracker.jpg?raw=true)
6. Right-click the WikiItemsApi project and select Properties. On the modal, select Debug and look at Script Arguments. Add the following to Script Arguments and fill them in with your Azure SQL or local credentials: `"URL or Local DB path" "DatabaseName" "SQLUsername" "SQLPassword"`
  ![Alt text](/DocumentationImages/Setup/wikiitemsapi.jpg?raw=true)
7. Right-click the WikiBlockApi project and select Properties. On the modal, select Debug and look at Script Arguments. Add the following to Script Arguments (leave the first value, the second replace with your contract ID, the third is the account address, and the fourth is the password you setup for the account): "http://127.0.0.1:8545" "0x63825D2448Ae9175B84b04b4DB8Fe4f35ef7B8De" "0xCb0C4471a93c7955177e4E6e4cC71f8dFf5E6DDA" "asdf" 
  ![Alt text](/DocumentationImages/Setup/wikiblockapi.jpg?raw=true)
8. Restore the Python packages by...

9. Go back to Visual Studio, and click Run or press F5.

## Opening & Running the Front-end Application
#### Front-end first time setup: 
1. Install https://nodejs.org/en/
2. Open a PowerShell with Admin 
3. Run `npm install @angular/cli -g`
4. Run `npm install` inside the WikiChangeAngular folder.

#### Front-end general every time setup:
1. Open Visual Studio Code.
2. In Visual Studio Code, open a folder, navigate to this downloaded project, open the folder called: WikiChangeAngular
3. Open the Terminal
  ![Alt text](/DocumentationImages/Setup/vscodeterminal.jpg?raw=true)
4. Run `npm run start`
5. Open your browser on http://localhost:4200/ and you will have a working application! Please see the [App Walkthrough](https://github.com/razi-rais/eth-wikipedia-changetracker/blob/master/Documentation/AppWalkthrough.md) for how to use the application.
