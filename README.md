# NodeJS Project
[![Build Status](https://travis-ci.com/SarahL24/NodeJS_ECEProject.svg?branch=tests)](https://travis-ci.com/SarahL24/NodeJS_ECEProject)

This is a **NodeJS Project** used with a **Mongo Database** made for learning purposes for ECE Paris-Lyon Engineering School. The goal was to build a simple **REST API** allowing CRUD operations on users and their metrics. The API comes with a web app including authentification and user interface. 

This project is to be marked for two main courses : **Technologies Web** and **DevOps**

## For "Technologies Web"

### Prerequisites

Before you begin, you first need to install ```nodejs``` and ```mongodb``` and activate the mongod service on *port 21017*. You can also use **Postman** to test the API


### Install

To install the project, first clone the GitHub repository with the command :

```bash
   git clone https://github.com/SarahL24/NodeJS_ECEProject.git
```

Then, open the project and in your console, type :
```bash
   npm install
```

Now, to start the server, you only have to run : 
```bash
   npm start
```

To populate the database, in an other console, type :
```bash
   npm run populate
```
You can populate either before or after running the server.

To perform the unit tests, please type in a shell :
* On Linux
  ```bash
   npm run test
    ```
* On Windows
   ```bash
   npm run testWindows
    ```

Although, we had trouble closing the Mongo Connection, so you have to **manually force the scripts to end** (CTRL + C) when they are done.

### Using the project

The server listens on *port 8080* of your localhost.

Here is the table of all the routes available

| Description                            | Route                                       | Method      | Required in body |
|----------------------------------------|---------------------------------------------|-------------|------------------|
|Credentials page, for login and signup  | [Credentials](http://localhost:8080/)       | GET         | -                |
|Home Page, where user informations are displayed |[Home Page](http://localhost:8080/home/:token) | GET | -             |
|Sign Up, creating a new user          |[Sign Up](http://localhost:8080/user/signup)   | POST        | **email**: String, **password**: String  |
|Log In, the user is redirect to home page |[Log In](http://localhost:8080/user/login)| POST         | **email**: String, **password**: String  |
|Delete an user and all its data          | [Delete User](http://localhost:8080/user/delete/:token) | POST | -          |
|Update an user, for email and/or password | [Update User](http://localhost:8080/user/update/:token) | POST | **newEmail**: String, **newPassword**: String  |
|Add a metric to the current user | [Add Metric](http://localhost:8080/metric/add/:token) | POST | **value**: Integer   |
|Delete a metric from the current user | [Delete Metric](http://localhost:8080/metric/delete/:token) | POST | -         |
|Update a metric of the current user | [Update Metric](http://localhost:8080/metric/update/:token) | POST | **newValue**: Integer |

Here is the set of users available after running the populate script :

| Email                         | Password                |
|-------------------------------|-------------------------|
| sergei.kudinov@adaltas.com    | SergeiTheBest           |
| gregor.jouet@adaltas.com      | DevOpsForTheWin         |
| maxime.billette@gmail.com     | maxou                   |
| sarah.lehuby@gmail.com        | latiteSassa             |
| amir.missidi@yahoo.fr         | Spartamir75             |


To prevent unregistered users from accessing data of other users, we put a **JSON Web Token** that refers to the user ID in the Mongo Database. This token is then integrated in the URL when doing sensitive CRUD operations.

To manage relationships between the data of MongoDB and NodeJS, we used **Mongoose** that provided us models easier to manipulate.

If you want to access to the database, please run this command in your mongo shell :
```shell
    > use nodeProject
    > db.users.find().pretty()
```

Our API is very strong when trying to CRUD on users. For example, you cannot change your email address to another existing one in the database. You can choose to change only your email, your password, or both. If you delete your account, you will not be able to access to your deleted data, whether it be via typing your credentials, or via getting it with your previous token. Althought, posting incorrect type in the body will make the app crash, so please be careful.


## For "DevOps"

### Prerequisites

You do not need to install anything except **Docker**, as both the web app and the Mongo Database are inside containers. This part of the project only works with Linux.

### Install

To install the project, first clone the GitHub repository with the command :

```bash
   git clone https://github.com/SarahL24/NodeJS_ECEProject.git
```

You still have to disable your mongo app from listening on the *port 21017* if you have one, by typing this command :
```bash
    service mongod stop
```

Then, open a terminal in the project and type :
```bash
    docker-compose up --build
```

### Using the project

You can use the project the exact same way as the **Technologie Web**, but accessing the database is a bit different : in another terminal, you can run :
```bash
    docker exec -it eceproject-mongo mongo
``` 
And from there, you can type the same request to access the users collection

You do not need to run the populate script, as the Mongo Database is already loaded with the appropriate volume. The script used to populate this database is the *mongo-init.js* at the root of the project.

To run the tests, use another console and type :
```bash
    docker exec -it eceproject-web bash
``` 
and then, inside this terminal :
```bash
    npm run test
```

When you are finished with the project, type :
```bash
    docker-compose down
```

## Contributors

The authors of this project are [*Maxime Billette*](https://github.com/Billette), [*Sarah Lehuby*](https://github.com/SarahL24) and [*Amir Messedi*](https://github.com/AmirMessedi)
