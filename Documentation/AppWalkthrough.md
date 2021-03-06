# App Walkthrough
This is a simple walkthrough of the working app for demonstration purposes.  The instructions will include technical aspects such as how things are working in the background with the Wikipedia API or how data is being saved.

The purpose of the application is to save Wikipedia URLs that you want to track the changes for, all in one place.  For example, if you are a music producer you may want to track all the albums' and artists' pages that you produce so that you know what changes the public makes to those Wikipedia pages.  Or, you could be a scientist keeping track of certain pages in your niche and you want to see if new research is added to your pages.  

Please see the [setup page](https://github.com/razi-rais/eth-wikipedia-changetracker/blob/master/Documentation/Setup.md) if you would like to learn how to setup this application on your machine. 

1. When you first open the app, if you are logged in, you will see a Dashboard page with any Wikipedia articles you have saved.  This will be empty if you have not saved any. 
   ![Alt text](/DocumentationImages/AppWalkthrough/dashboard.jpg?raw=true)

2. Click on the Watch page to see this:
   ![Alt text](/DocumentationImages/AppWalkthrough/watch.jpg?raw=true)

We are taking the ID from the above in order to save as a unique identifier in our system in our SQL Database.  We are "watching" certain page ID's and want to ensure that we do not duplicate watches; so if the ID is already in the system, it will not be re-added, but it will be associated to the User ID who wants to watch the article. 

3. If you click on the Watch button, you can choose to add a Wikipedia URL.  For example, try to add the following URL: https://en.wikipedia.org/wiki/Amazon_(company). Note "amazon" could refer to multiple things, the forest, the comapny, etc.. and the way Wikipedia deals with the URL is that they add an underscore for a space and add more specifics into parenthesis.  Each URL can be broken into the page name You will notice that the IDs are populated from the URL.  When the Wikipedia API is called, it will return a payload like this:
   ![Alt text](/DocumentationImages/AppWalkthrough/watchurl.jpg?raw=true)

4. If you want to watch multiple at a time, click the green '+' button. 
   ![Alt text](/DocumentationImages/AppWalkthrough/watchmultiple.jpg?raw=true)

5. Now go back to the Dashboard page which should have at least 1 page watched from the previous step. It should look something like this:

6. Notice the table has details.  The button options are < 24 hours, < 48 hours, or > 48 hours (this indicates how recent the last change was to any page you watched).  Note: The pages watched do have a history of changes, however these are not part of the "latest change" if they occurred before that time you added the page to be watched.  From the time you watch the page on our app and forward, any new changes will be caught by us and can trigger the latest change button. 
   ![Alt text](/DocumentationImages/AppWalkthrough/dashboardWithItem.png?raw=true)

7. Click on a specific entry for more details.  You will be taken to another page that has more info about each transactional change and will be like the following screenshot: 
   ![Alt text](/DocumentationImages/AppWalkthrough/details.png?raw=true)
