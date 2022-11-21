<h1 align='center'><b>Namaste</b></h1> 

**[Namaste](https://www.namaste-tw.com/)** is a one-stop website where B2C and B2B services are offered, allowing studio owners and customers to access different services.

Studio pages:
* [Yoga with Lucie](https://www.namaste-tw.com/yogaWithLucie)
* [Today Yoga](https://www.namaste-tw.com/todayYoga)
* [SPACE Wellness](https://www.namaste-tw.com/spaceWellness)
* [AppleTree Studio](https://www.namaste-tw.com/appleTreeStudio)
* [Amazing Factory](https://www.namaste-tw.com/amazingFactory)

Studio admin pages **(must login with studio owner account FIRST)**:
* [Yoga with Lucie](https://www.namaste-tw.com/yogaWithLucie/admin)
* [Today Yoga](https://www.namaste-tw.com/todayYoga/admin)
* [SPACE Wellness](https://www.namaste-tw.com/spaceWellness/admin)
* [AppleTree Studio](https://www.namaste-tw.com/appleTreeStudio/admin)
* [Amazing Factory](https://www.namaste-tw.com/amazingFactory/admin)


<br>
<br>
<br>

# Table of Contetns
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [Run Server](#run-server)
  - [Seed Users](#seed-users)
- [Tech Stack](#tech-stack)
- [Architecture Diagram](#architecture-diagram)

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
5. Apply migration and seed data **(Important: must apply migration FIRST)**
    ```
    npx sequelize db:migrate
    npx sequelize db:seed:all
    ```

## **Run Server**

1. Start server **(Important: make sure to apply migrate & seed data BEFORE start server)**
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

# Seed Users
Password for every seed user account : **`test1234`**

## **Admin - Root**  
    email: root@test.com  

<br/>

## **Admin - studio owner**
5 available accounts  
 
    # for 'Yoga with Lucie' studio
    account: lucie@test.com 

    # for 'Today Yoga' studio
    account: paula@test.com 

    # for 'SPACE Wellness' studio
    account: marie@test.com 

    # for 'AppleTree Studio' studio
    account: april@test.com 

    # for 'Amazing Factory' studio
    account: eva@test.com 


## **User**
17 available account

    email: azole@test.com
    email: tzuyu@test.com
    email: david@test.com
    email: yenchu@test.com
    email: timmy@test.com
    email: kuan-hao@test.com
    email: cks@test.com
    email: ps@test.com
    email: shane@test.com
    email: ivan@test.com
    email: kelly@test.com
    email: wen@test.com
    email: mila@test.com
    email: ingrid@test.com
    email: jianjian@test.com
    email: ding@test.com
    email: shirney@test.com

