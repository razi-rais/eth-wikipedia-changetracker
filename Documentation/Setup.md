# Setup Introduction
Setup instructions will be broken down by different environments.  The project was built in Python so it would be more cross platform. If you would like to use a VM to ensure everything is in a clean environment, we have an Azure ARM template that you can deploy with easily just by clicking below.  Otherwise, you are welcome to use your local machines.  You do not need to use Visual Studio or Visual Studio Code if you have another IDE in mind.   

# Start Here, Choose Your OS, and Install Required Software: 
Once you have completed the steps for any one of these 3 paths, please move on to the next section labeled "Setup Rinkeby and Get Free Ether". 
* [Windows / Visual Studio Setup](https://github.com/razi-rais/eth-wikipedia-changetracker/blob/master/Documentation/WindowsSetup.md) - Choose this if you are a Windows user and want to set this up using your local machine. 
* [Mac Setup (Linux will be similar)](https://github.com/razi-rais/eth-wikipedia-changetracker/blob/master/Documentation/LinuxSetup.md) - Choose this if you are a Mac user and want to set this up using your local machine. 
* [Azure VM - Windows Server 2016](https://github.com/razi-rais/eth-wikipedia-changetracker/blob/master/Documentation/VMSetup.md) - Choose this if you prefer to complete this tutorial using an Azure VM.  We will provide an ARM template for easy VM setup with a couple of clicks.  It will have a clean environment and be separate from your local machine, all you need to do is RDP in.  

# Opening & Running the Back-end Application
These steps will show usage with Visual Studio as the IDE, however you can use any IDE you like and do equivalent steps and use this as a guide. 
1. Open the WikiChangeTracker.sln in Visual Studio (or open projects in another IDE).
2. You will see the following projects:

3. Right click properties and ensure these are the startup projects.
4. Click Run or press F5.

# Opening & Running the Front-end Application
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

# Setup Rinkeby and Get Free Ether
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
11. In the Solidity page, after the contract compile, hit Run and choose Integrated Web 3. Hit Create. Give time for the transaction to go through. 
   ![Alt text](/DocumentationImages/Metamask/7-integrated-web3.jpg?raw=true)
12. Open MetaMask up and you should see the account you created (should be same contract ID).
   ![Alt text](/DocumentationImages/Metamask/9-accountbalance.jpg?raw=true) 
13. Once it is done, go to Rinkeby and check for a transaction by going to the Block Explorer and searching for your Contract ID. 
   ![Alt text](/DocumentationImages/Metamask/10-contractcreation.jpg?raw=true)
