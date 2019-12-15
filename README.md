# NodeJS Project
[![Build Status](https://travis-ci.com/SarahL24/NodeJS_ECEProject.svg?branch=tests)](https://travis-ci.com/SarahL24/NodeJS_ECEProject)

This is a NodeJS Project used with a Mongo Database made for learning purposes for ECE Paris-Lyon Engineering School. The goal was to build a simple REST API allowing CRUD operations on users and their metrics. The API comes with a web app including authentification and user interface. 

This project is to be marked for two main courses : **Technologies Web** and **DevOps**

## For "Technologies Web"

### Prerequisites

Before you begin, you first need to install ```nodejs``` and ```mongodb``` and activate the mongod service on port 21017. You can also use **Postman** to test the API


## Install

To install the project, first clone the GitHub repository with the command :

```bash
   git clone https://github.com/SarahL24/NodeJS_ECEProject.git
```

Then, open the folder and in your console, type :
```bash
   npm install
```

Now, to start the server, you only have to run : 
Then, open the folder and in your console, type :
```bash
   npm start
```

To populate the database, in an other console, type :
```bash
   npm run populate
```
You can populate either before or after running the server.

## Using the project

The server listens on port 8080 of your localhost.

Here is the table of all the routes available

|                |ASCII                          |HTML                         |
|----------------|-------------------------------|-----------------------------|
|Single backticks|`'Isn't this fun?'`            |'Isn't this fun?'            |
|Quotes          |`"Isn't this fun?"`            |"Isn't this fun?"            |
|Dashes          |`-- is en-dash, --- is em-dash`|-- is en-dash, --- is em-dash|

-------------

## Contributors

The authors of this lab are [*Maxime Billette*](https://github.com/Billette), [*Sarah Lehuby*](https://github.com/SarahL24) and [*Amir Messedi*](https://github.com/AmirMessedi)
