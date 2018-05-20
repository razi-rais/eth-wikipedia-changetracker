## Mac OS X / Linux 

Running this project on both Mac OS X and Linux requires almost identical steps. We will predominantly be using Docker to build and run almost all projects. Thi means that Docker images should work as-is on both Linux and Mac OS X.

First make sure you have following prerequisites installed:

* Docker 17.2.0-ce (or later version)
* Geth 1.7.3 (later versions may also be fine, but code has not been tested on them)
* Node 9.5.0 
* NPM 5.6.0  
* Git 2.15.1 (or later version)

Start by cloning the project: ```git clone https://github.com/razi-rais/eth-wikipedia-changetracker.git ``` . Make sure you are inside the root directory i-e ```/eth-wikipedia-changetracker```

## Building Docker Images
Now, we will build the Docker images:
 
* WikiChangeTracker: ``` docker build -t wikichangetracker:1.0  ./WikiChangeTracker ```
* WikiItemsApi:  ``` docker build -t wikiitemsapi:1.0  ./WikiItemsApi ```
* WikiBlockApi: ``` docker build -t wikiblockapi:1.0  ./WikiBlockApi ```

## Database
We will need to persist some data inside the database.This includes URL of the page, its tile etc. Currently Azure SQL is used but technically it doesn't matter if your SQL is running on-premises or in the cloud.
