<h1 align="center">CPX Architects RESTfull API</h1>

# About The Project

CPX Architects - Backend

Simple Profile Company Website,
this application is made using Express Js v4 and mysql for database

## Built With

[![Express Js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Node Js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js v18</a>
2. Project Dependency (Node_modules)
3. API Testing <a href="https://www.getpostman.com/">Postman</a>
4. Database Server <a href="https://www.apachefriends.org/download.html">Xampp</a>

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #cofeeshop, and Import file sql from folder database to **phpmyadmin**
6. type `npm install -g nodemon` to install nodemon
7. type `nodemon` to run the server
8. You can see all the endpoint [here](https://documenter.getpostman.com/view/15940810/2sAYBUFCwC)

## Feature

<ul>
<li>Update Contact</li>
<li>Create, Update, Delete, Get Gallery</li>
<li>Create, Update, Delete, Get Banner</li>
<li>Create, Update, Delete, Get Project</li>
</ul>

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```js
NODE_ENV = development
PORT = 8000
APP_URL=http://localhost:8000
APP_KEY=MyBackend
APP_UPLOAD_PATH=assets/images

DB_HOST = localhost
DB_USER = root
DB_PASSWORD =
DB_DATABASE = cpx_architects
```

## License

© [M Fiqry Arahmansyah](https://www.instagram.com/xfiqryx)
