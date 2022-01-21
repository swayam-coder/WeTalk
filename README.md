# WeTalk
#### Group chat app built by using GraphQL Subscriptions and Websockets.
#### *currently working on frontend of this project

## Technologies Used

* GraphQL (Apollo Server) - schema-first or SDL first approach using GraphQL-Codegen 
    *(currently shifting to code-first approach using TypeGraphQL)
* ExpressJS
* ReactJS + URQL 
* GraphQL Subscriptions 
* GraphQL Shield + GraphQL Middleware - For authorization of protected queries/mutations
* WebSockets (Graphql-ws + ws)
    *(will later shift to Server Sent Events) 
* Typegoose - Mongoose for Typescript ([see here](https://typegoose.github.io/typegoose/))
* jsonwebtoken - For authentication (asymmetric signing using private/public PEM keys)

## Run Locally
### 1. Clone the repository
```sh
$ git clone https://github.com/swayam-coder/WeTalk.git
```

### 2. Install Dependencies
```sh
$ npm install 
```
### 3. Setup MongoDB Database
```sh
Set up a mongodb database according to the given schema definition in the project.
```
### 4. Run locally
```sh
$ npm run dev 
```
