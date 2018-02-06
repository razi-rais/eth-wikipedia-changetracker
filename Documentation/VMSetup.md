# Azure - Blockchain Developer Virtual Machine (Windows)
1. Make sure you have an active Azure account. This can be a MSDN account, trial account, or paid account. You can sign up for a free trial account which will include $200 of credits that last 1 month here: https://azure.microsoft.com/en-us/offers/ms-azr-0044p/ (Note: for free trial account you will need to use a credit card to sign up, however you will not get charged upon signup OR unless you specifically activate your account at the end of the month. There are no tricks that will automatically sign you up for a paid account at the end of the trial, you must manually choose to go to a paid account).
2. Click on the below link to Deploy to Azure. 

        Azure ARM template that creates Azure Windows VM with following software installed:
        * Windows Server 2016
        * Geth (v 1.7.2)
        * Nodejs (Latest version) | (For Truffle and Remix that are installed using npm later)
        * Google Chrome (For Metamask that is installed later)
        * Docker for Windows (Latest version - Edge Release)
        * Visual Studio Code (Solidity extension installed later)

        <a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Frazi-rais%2Fblockchain%2Fmaster%2Ftemplates%2Faz-blockchain-win-vm.json" target="_blank">
            <img src="http://azuredeploy.net/deploybutton.png"/>
        </a>
        <a href="http://armviz.io/#/?load=https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Frazi-rais%2Fblockchain%2Fmaster%2Ftemplates%2Faz-blockchain-win-vm.json" target="_blank">
            <img src="http://armviz.io/visualizebutton.png"/>
        </a>

3. Choose your Azure subscription if you have multiple.  The one in the screenshot is using Visual Studio Enterprise from an MSDN subscription. Your subscription name may be different.
4. Create a new resource group in the location nearest to you.
5. Add a username that is easy for you to remember, by default you can use 'super'. 
6. Create a password that you can remember, if you want to have a default that fits the password requirements you can use 'P@ssw0rd123!'.
7. Check the box for agreeing to the terms and conditions. 
8. Click Publish. 

