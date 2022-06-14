## NestJS Backend Built for Bachelor Thesis at KTH Royal Institute of Technology
This application is part of the start of a bachelor thesis evaluating the advantages and disadvantages of using the [NestJS framework](https://nestjs.com/ "Visit the NestJS homepage") to teach microservice architecture to students taking the *Architecture and Design of Global Applications* course at KTH's Kista Campus in Stockholm.

### Background
The KTH course [IV1201: Architecture and Design of Global Applications](https://www.kth.se/social/course/IV1201/ "Visit the course homepage") is described by its examiner as follows:
>This is a hands-on course that focuses not only on creating an architecture but also on implementing it in code. You will learn how to implement a given requirement specification in production quality code, following architecture and design best practices. The main archtectural areas that are studied are security, transactions and persistence.
<br />
The coursework consists of a group of students developing a software system that satisfies certain architectural criteria. The students are given an application description along with a set of architectural tasks that must be met in order to obtain a passing grade. This application can be developed according to several different architectural styles, one of those being a microservice architecture.

Due to many students of the course having little to no previous experience working with microservices, there was an interest in identifying a framework that could be recommended to those students in order for them to develop their first microservices application.

### Why NestJS
First off, it's important to mention that NestJS was identified as a __candidate__ for being a good framework to choose for inexperienced students. The purpose of the thesis evalutation was to determine if that was the case or not.<br /><br />
On [Nest's homepage](https://nestjs.com/ "Visit the NestJS homepage"), the framework is described as
>A progressive Node.js framework for building efficient, reliable and scalable server-side applications
<br />
NestJS was chosen because it is a opinionated Node.js framework with built-in support for microservices functionality. Many students have previous knowledge of working with Node.js, and for those who do not it it fairly easy for the university to get them started. 

### Primary Literary Sources
While upward of 30 different sources pertaining to subjects such as microservices, NestJS, software architecture, and qualitative research where consulted when constructing the theoretical background and research methodology of the thesis, the main task of the document analysis was identifying comprehensive, introductory works aimed at teaching microservices to readers with little to no experience in the subject. These major works should also have been written by established authors well-versed in the subject. Three such works were identified:
* Microservices Patterns: With Examples in Java, by Chris Richardson ([Purchase book from Amazon](https://www.amazon.com/Microservices-Patterns-examples-Chris-Richardson/dp/1617294543))
* Building Microservices: Designing Fine-grained Systems, by Sam Newman ([Purchase book from Amazon](https://www.amazon.com/Building-Microservices-Designing-Fine-Grained-Systems/dp/1491950358))
* Microservices Architecture: Aligning Principles, Practices, and Culture, by Irakli Nadareishvili ([Purchase book from Amazon](https://www.amazon.com/Microservice-Architecture-Aligning-Principles-Practices/dp/1491956259))
<br />
These books formed the backbone of the work of defining the architectural evaluation criteria of the NestJS microservices functionality.

### Main Areas of Microservices Architecture to Evaluate
The primary sources were analyzed and used to write the theoretical background of the thesis. Where it was needed, concepts or key terms in the primary sources were used to find complementary sources. Parallelly with this work the primary sources were also used to identify main areas of microservice architecture that should form the basis of the evaluation criteria used to evaluate how the NestJS framework can be used to teach microservices in a university environment. These main areas are:
* Modeling Services
* Interprocess Communication (IPC)
* Persisting Data
* The API Gateway Pattern
* Deployment

### Application Structure
| <img src="https://i.imgur.com/OBdUAsZ.png" width="60%" height="50%" /> |
| ------ |
The application can be used by logged in accounts. Accounts either have the role _Admin_ or _User_. The arrowheads on the RabbitMQ message broker lines indicate one-way knowledge. This means that the API Gateway can initiate message sending to the services it is connected to, but the services can not initiate contact with the API Gateway, they can only return responses to outside requests. The same goes for the UserResource service's connection to the Notifications Service.
#### Components:
* __API Gateway__: Implented as a NestJS service. Receives HTTP requests from users and forwards them to the appropriate service after performing JWT-Passort authentication, and role based authorization. Implemented in NestJS as the purpose of the app is to teach students about microservice architectural principles. A far more efficient solution would be using something like Ingress-nginx, but that would hide too much of the ideas behind an API Gateway to students.
* __Auth Service__: Receives messages from the API Gateway through a RabbitMQ message broker. This service contains two modules: `authentication` & `users`. The service's external API only exposes the `login()` endpoint. The `authentication` module approves a login attempt by consulting the `users` module. This service is not connected to an external database as the registered users are hardcoded in `users` module.
* __Resource Service__: Receives messages from the API Gateway through a RabbitMQ message broker. The service's external API exposes the `createNewResource()` & `getAllResources()` endpoints. The API Gateway ensures that only logged in accounts can call these endpoints, and that only accounts with the roles _Admin_ can call the `createNewResource()` endpoint. Resources are saved in a MongoDB Atlas cloud database service. 
* __UserResource Service__: Receives messages from the API Gateway through a RabbitMQ message broker, and sends messages to the Notifications Service through another RabbitMQ message broker. The external API exposes the `createNewUserResource()` & `getAllUserResources()` endpoints. Only accounts with the role _User_ can call `createNewUserResource()`, while only accounts with the role `Admin` can call `getAllUserResources()`. UserResources are saved in an AWS Relational Database Service (RDS) using a MySQL engine.
* __Notifications Service__: Receives messages from the UserResource service through a RabbitMQ message broker. Every time a new UserResource is created, the `handleNewUserResourceCreated()` endpoint of this service's external API is called. This service is the only service the API Gateway can not call. The service is not connected to an external database as it currently has no functionality creating that need.
#### Inter-process Communication (IPC) & Databases
* __CloudAMQP (RabbitMQ as a Service)__: Cloud services were chosen as the solution for both IPC and databases. This is because students of different programming backgrounds and of different experience will need to get a project started in a very short amount of time. Cloud services are practical in such situations, as other more effecient solutions using for example Docker can be very hard for some students to get acclimated with in just a week or so. CloudAMQP was chosen as it is a popular message broker as a service, it is free, and it's easy to start up. The thesis' purpose is to evaluate NestJS for teaching microservices, i.e. how easy is it to hook up NestJS with an external IPC handler and how clear is it to new users what the IPC is being used for.
* __AWS RDS & MongoDB Atlas__: Following the logic above, databases as cloud services were chosen. A key concept of microservices is the autonomy of different services in a system, therefore two different databases were used. As with the IPC, the databases themselves are not being evaluated, but rather how NestJS allows its users to integrate their app with them.
