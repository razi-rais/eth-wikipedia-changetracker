# Azure - Blockchain Developer Virtual Machine (Windows)
1. Make sure you have an active Azure account. This can be a MSDN account, trial account, or paid account. 
2. Click on the below link to Deploy to Azure. 
3. Create a new resource group in the location nearest to you.
4. Add a username that is easy for you to remember, by default you can use 'super'. 
5. Create a password that you can remember, if you want to have a default that fits the password requirements you can use 'P@ssw0rd123!'.
6. Check the box for agreeing to the terms and conditions. 
7. Click Publish. 

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
