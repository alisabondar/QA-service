# E-Commerce Backend Revamp: Questions and Answers Microservice

Welcome to our revamped backend API service for our e-commerce site! Our team of two talented software engineers undertook a significant transformation to transition from a monolithic structure to a modern, service-oriented microservices architecture. This transition was designed to not only support our current system but to amplify its capabilities for the future.

## Highlights

**Database Optimization**  
Strategically chose PostgreSQL for its horizontal scaling capabilities. Reduced average response time by 99.9% through query indexing.  
**Deployment & Load Balanding**  
Deployed the microservice with two AWS EC2 instances alongside Nginx as a load balancer, resulting in a remarkable 91% improvement in response time and a 0% error rate during stress testing.

## Dataset

## Tech Stack
[![Node][Node.js]][Node-url]
[![Express][Express.js]][Express-url]
[![Axios][Axios.js]][Axios-url]
[![Postgres][Postgres.js]][Postgres-url]
[![Jest][Jest.js]][Jest-url]
[![k6][k6.js]][k6-url]
[![AWS][AWS.js]][AWS-url]
[![Docker][Docker.js]][Docker-url]
[![Nginx][Nginx.js]][Nginx-url]

## Table of Contents

## System Design
**Database Design**  
<img width="547" alt="Screenshot 2023-09-25 at 1 41 39 PM" src="https://github.com/alisabondar/QA-service/assets/126842393/8bc35569-636d-46cf-8c24-539fd6f98b33">

## Usage
Retrieves the list of questions based on a product ID, answers based on a question ID, and photos based on an answer ID.
```
GET /qa/questions/:product_id
```
<img width="409" alt="Screenshot 2023-09-25 at 1 57 17 PM" src="https://github.com/alisabondar/QA-service/assets/126842393/d3be1b4d-6666-42ef-8d83-27738133f61a">

```
GET /qa/questions/:question_id/answers
```
Query Parameters:
<img width="707" alt="Screenshot 2023-09-25 at 1 59 14 PM" src="https://github.com/alisabondar/QA-service/assets/126842393/572f8607-1a80-4480-bab4-491cc3ec7a80">

<img width="443" alt="Screenshot 2023-09-25 at 1 57 42 PM" src="https://github.com/alisabondar/QA-service/assets/126842393/4dff0dec-7b9b-4dc3-9436-3a343820070e">

## Database Initialization and ETL
**Local: Create and Seed the Database**
To get started, download the data from: ```https://drive.google.com/drive/folders/1Gqxt7Tw0I50OG2dn4LncHAJ_x_BnWuRX```

Locally run psql from the command line and run the following commands:
```
CREATE ROLE [username] WITH LOGIN PASSWORD [password];
ALTER ROLE [username] CREATEDDB;  
\q  
psql postgres -U [username]  
CREATE DATABASE [dbName]  
```

Create an .env file with the following keys:  
```
PGUSER  
PGHOST  
PGPASSWORD  
PGDATABASE  
PGPORT  
```

Run this command in the terminal:
```
npm install
npm run start
```

Lastly, seed the database through your local psql:  
```  
psql postgres -U [username]  
\copy questions FROM  [path to questions csv file] DELIMITER ',' CSV HEADER;  
\copy answers FROM  [path to answers csv file] DELIMITER ',' CSV HEADER;  
\copy photos FROM [path to photos csv file] DELIMITER ',' CSV HEADER;  
```  

## Quickstart
```
npm run start
```
Begin testing the API!  
Use Postman or any API client of your choice to test the endpoints. Here are some to get started:  

Fetch questions
```
http://localhost:3000/qa/questions/12
```
Fetch answers with photos  
```
http://localhost:3000/qa/questions/12/answers
```


## Other Services
[Products Microservice](https://github.com/MachuPixel/sdc-overview-api#-db-initialization-and-etl-queries-in-postgres)


[Node.js]: https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/en
[Jest.js]: https://img.shields.io/badge/Jest-C21325.svg?style=for-the-badge&logo=Jest&logoColor=white
[Jest-url]: https://jestjs.io/
[Axios.js]: https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=Axios&logoColor=white
[Axios-url]: https://axios-http.com/docs/intro
[Express.js]: https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white
[Express-url]: https://expressjs.com/
[AWS.js]: https://img.shields.io/badge/Amazon%20AWS-232F3E.svg?style=for-the-badge&logo=Amazon-AWS&logoColor=white
[AWS-url]: https://aws.amazon.com/
[Postgres.js]: https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white
[Postgres-url]: https://www.postgresql.org/
[k6.js]: https://img.shields.io/badge/k6-7D64FF.svg?style=for-the-badge&logo=k6&logoColor=white
[k6-url]: https://k6.io/
[Docker.js]: https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=Docker&logoColor=white
[Docker-url]: https://www.docker.com/
[Nginx.js]: https://img.shields.io/badge/NGINX-009639.svg?style=for-the-badge&logo=NGINX&logoColor=white
[Nginx-url]: https://www.nginx.com/
