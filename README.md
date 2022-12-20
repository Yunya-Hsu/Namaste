<br>
<p align="center">
  <img src="/public/namaste/namaste_logo.png" style="width: 300px;" />
</p>

[Namaste](https://www.namaste-tw.com/) is a one-stop yoga course platform where `B2C` and `B2B` services are offered, allowing studio owners and customers to access different services.  
<br>

### Home page
- [Namaste](https://www.namaste-tw.com/)

### Studio's dedicated pages
- [Yoga with Lucie](https://www.namaste-tw.com/yogaWithLucie)
- [Today Yoga](https://www.namaste-tw.com/todayYoga)
- [SPACE Wellness](https://www.namaste-tw.com/spaceWellness)
- [AppleTree Studio](https://www.namaste-tw.com/appleTreeStudio)
- [Amazing Factory](https://www.namaste-tw.com/appleTreeStudio)

### Studio admin pages
- [Yoga with Lucie](https://www.namaste-tw.com/yogaWithLucie/admin) (must login with studio owner account **FIRST**)


<br>
<br>
<br>

# Table of Contents
- [Test Credit Card](#test-credit-card)
- [Seed Users](#seed-users)
- [Tech Stack](#tech-stack)
- [Architecture Diagram and Git flow](#architecture-diagram-and-git-flow)
- [Table Schema](#table-schema)
- [Features](#features)
  - [Multi-Tenancy](#multi-tenancy)
  - [RBAC](#rbac)
  - [Live Streaming](#live-streaming)
  - [Customized Website for studios](#customized-website-for-studios)

<br>
<br>


# Test Credit Card  
### **Credit card**

    信用卡卡號: 4242 4242 4242 4242
    到期日: 01/23
    CCV: 123

For purchasing points:
<p align="center">
    <img src="/readme/testCreditCard.png"  style="width: 450px;" />
</p>

<br>
<br>


# Seed Users   
### **Root owner**
Have authority to [create studio](https://www.namaste-tw.com/admin/studio): 
    
    account: root@test.com
    password: test1234

### **Studio owner**
For [Yoga with Lucie](https://www.namaste-tw.com/yogaWithLucie/admin) studio: 
    
    account: lucie@test.com
    password: test1234

### **User**
[Login](https://www.namaste-tw.com/user/login) page:

    email: test@test.com
    password: test1234

<br>
<br>


# Tech Stack
- **Front-End**: HTML <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="25" height="25"/> </a> , CSS <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="25" height="25"/> </a>, JavaScript <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="25" height="25"/> </a> , SweatAlert, Express Handlebars, WebRTC
- **Back-End**: Node.js <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="25" height="25"/> </a> , Express <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> , Socket.IO
- **Database**: MySQL <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="25" height="25"/> </a>, Redis <a href="https://redis.io" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg" alt="redis" width="25" height="25"/> </a> 
- **Amazon Cloud Service** <a href="https://aws.amazon.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="aws" width="25" height="25"/> </a>: EC2, RDS, S3, CloudFront, ElastiCache
- **Test & CI/CD**: Postman <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="25" height="25"/> </a>, Jest <a href="https://jestjs.io" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="25" height="25"/> </a>, GitHub Action
- **Version Control**: Git <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="25" height="25"/> </a>
- **Authorization**: Role-Based Access Control(RBAC)
- **Other Concepts**: cookie-session, RESTful API



<br>
<br>


# Architecture Diagram and Git flow
<p align="center">
    <img src="/readme/architecture.png" style="width: 900px;" />
    <br>
    <img src="/readme/CICD.png" style="width: 900px;" />
</p>

<br>
<br>

# Table Schema
<p align="center">
    <img src="/readme/table_schema.png" />
</p>
<br>
<br>

# Features

## Multi-Tenancy
Namaste utilize `multi-tenancy` to serves multiple studios, each studio is called a tenant.   
Tenants(studios) can be given the ability to customize some parts of the application, such as home page/ price rules/ courses and studio information.  
In this way, Namaste can share a dedicated instance of configurations, data, management and other properties with studios.  
<p align="center">
    <img src="/readme/multi_tenancy_1.gif" style="width: 800px;" />
</p>

<br>
<br>


## RBAC 
`Role-based access control (RBAC)` restricts network access based on a person's role within an studio, and the roles in RBAC refer to the levels of access that users have to the studio.  
<p align="center">
    <img src="/readme/RBAC_intro.png" style="width: 600px;" />
</p>
<br>
<br>
Users are only allowed to access the pages necessary to effectively perform their job duties. Access can be based on several factors, such as authority, responsibility, and job competency. In addition, access can be limited to specific tasks such as the ability to view, create, or modify a file.
<p align="center">
    <img src="/readme/RBAC_1.gif" style="width: 800px;" />
</p>
<hr>
<p align="center">
    <img src="/readme/RBAC_2.gif" style="width: 800px;" />
    <br>
    Only the studio admin user can access their admin dashboard and update/ create studio info.
</p>

<br>
<br>


## Live Streaming
Use `WebRTC` (Web Real-Time Communication) to accomplish real time media communications directly between browsers, and utilize `WebSocket` technology to let browsers exchange SDP and ICE candidate with signal server.  
With live streaming feature, yoga teachers and students can have online live streaming classes anytime and location is no longer a barrier.   
  
There are two way of live stream: 
1. **Group yoga course**: teacher will share his/her video and student can watch it.
<p align="center">
    <img src="/readme/livestream_1.gif" style="width: 550px;" />
    <br>
</p>
<hr>  

2. **One-on-one yoga courses**: teacher and student can share their video & voice separately.
<p align="center">
    <img src="/readme/livestream_2.gif" style="width: 550px;" />
    <img src="/readme/livestream_3.gif" style="width: 550px;" />
    <br>
</p>
<br>
<br>

## Customized Website for Studios
Each studio has their `own customized website` to display dedicated price rules, weekly courses, studio information and teachers.  
<p align="center">
    <img src="/readme/customized_website_1.gif" style="width: 800px;" />     
</p>
<hr>
<p align="center">
    <img src="/readme/customized_website_2.gif" style="width: 800px;" />
</p>
<br>
<br>



