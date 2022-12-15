<p align="center">
  <img src="/public/namaste/namaste_logo.png" style="width: 180px;" />
</p>
<h1 align='center'>Namaste</h1> 

[Namaste](https://www.namaste-tw.com/) is a one-stop yoga course platform where B2C and B2B services are offered, allowing studio owners and customers to access different services.  
<br>

### Namaste home page
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

# Table of Contetns
- [Seed Data](#seed-data)
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

# Seed Data   
### **Root owner**
have right to [create studio](https://www.namaste-tw.com/admin/studio): 
    
    account: root@test.com
    password: test1234
<br>  

### **Studio owner**
For [Yoga with Lucie](https://www.namaste-tw.com/yogaWithLucie/admin) studio: 
    
    account: lucie@test.com
    password: test1234
<br>  

### **User**

    email: azole@test.com // FIXME:
    password: test1234
<br>  

### **Credit card**

    信用卡卡號: 4242 4242 4242 4242
    到期日: 01/23
    CCV: 123

<br>
<br>


# Tech Stack
- **Front-End**: HTML, CSS, JavaScript, SweatAlert, Express Handlebars, WebRTC
- **Back-End**: Node.js, Express, Socket.IO
- **Database**: MySQL, Redis
- **Amazon Cloud Service**: EC2, RDS, S3, CloudFront, ElastiCache
- **Test & CI/CD**: Jest, GitHub Action
- **Authorization**: Role-Based Access Control(RBAC)
- **Other Concepts**: cookie-session, RESTful API

<br>
<br>


# Architecture Diagram and Git flow
<p align="center">
    <img src="https://d298mxo82mdv9e.cloudfront.net/readme/architecture.png" style="width: 900px;" />
    <img src="https://d298mxo82mdv9e.cloudfront.net/readme/CICD.png" style="width: 900px;" />
</p>

<br>
<br>

# Table Schema
<p align="center">
    <img src="https://d298mxo82mdv9e.cloudfront.net/readme/table_schema.png" />
</p>
<br>
<br>

# Features

## Multi-Tenancy
Namaste utilize `multi-tenancy` to serves multiple studios, each studio is called a tenant. Tenants(studios) can be given the ability to customize some parts of the application, such as home page/ price rules/ courses and studio information. 
In this way, Namaste can share a dedicated instance of configurations, data, management and other properties with studios.  
<p align="center">
    <img src="https://d298mxo82mdv9e.cloudfront.net/readme/multi_tenancy_1.gif" style="width: 800px;" />
</p>

<br>
<br>


## RBAC 
Role-based access control (RBAC) restricts network access based on a person's role within an studio, and the roles in RBAC refer to the levels of access that users have to the studio.
Users are only allowed to access the pages necessary to effectively perform their job duties. Access can be based on several factors, such as authority, responsibility, and job competency. In addition, access can be limited to specific tasks such as the ability to view, create, or modify a file.
<p align="center">
    <img src="https://d298mxo82mdv9e.cloudfront.net/readme/RBAC_intro.png" style="width: 600px;" />
</p>

<br>

<p align="center">
    <img src="https://d298mxo82mdv9e.cloudfront.net/readme/RBAC_1.gif" style="width: 400px;" />
    <img src="https://d298mxo82mdv9e.cloudfront.net/readme/RBAC_2.gif" style="width: 400px;" />
    <br>
    Only the studio admin user can access their admin dashboard and update/ create studio info.
</p>

<br>
<br>


## Live Streaming


<br>
<br>

## Customized Website for studios
Each studio has their own customized website to display dedicated price rules, weekly courses, studio information and teachers.  
<p align="center">
    <img src="https://d298mxo82mdv9e.cloudfront.net/readme/customized_website_1.gif" style="width: 400px;" /> 
    <img src="https://d298mxo82mdv9e.cloudfront.net/readme/customized_website_2.gif" style="width: 400px;" />
</p>

<br>
<br>



