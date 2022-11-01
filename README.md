<h1 align='center'><b>Namaste</b></h1> 

<br>
<br>
<br>

# Table of Contetns
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [Run Server](#run-server)

<br>
<br>

# Getting Started
## **Prerequisites**
Make sure you already have `Node.js` and `npm` installed, and have `MySQL` account.

<br>

## **Installing**
1. Clone the project and go to the project directory
    ```
    git clone https://github.com/Yunya-Hsu/Namaste.git

    cd Namaste
    ```
2. Install dependencies
    ```
    npm install
    ```
3. Prepare your `.env` file. Please refer to `.env.example` for more details. 
4. Create database: 
    ```
    create database namaste
    ```
5. Create tables via migration **(Important: must apply migration BEFORE start server)**
    ```
    npx sequelize db:migrate
    ```
## **Run Server**

1. Start server
    ```
    npm run start
    ```
    If you see  `server is listen on 3000`  on terminal, it means the server is running successfully and you can start exploring it on browser.

2. Stop server
    ```
    control + c
    ```
<br/>
<br/>

