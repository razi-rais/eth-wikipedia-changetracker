# Windows Application Setup
Now that you have either setup your local Windows machine or a Windows Server VM, please complete the following instructions to get the application running.  We will first setup the back-end application, then continue to the front-end. 

## Opening & Running the Back-end Application
These steps will show usage with Visual Studio as the IDE, however you can use any IDE you like and do equivalent steps and use this as a guide. 

1. Open the WikiChangeTracker.sln in Visual Studio (or open projects in another IDE).
2. You will see the following projects:

3. Right click properties and ensure these are the startup projects.
4. Click Run or press F5.

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
