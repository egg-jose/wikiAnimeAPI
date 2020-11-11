# wikiAnimeAPI
API about anime - practice node js express structure by components

# Description
API that simulates a virtual commerce store so that a user registers, logs in and proceeds to choose the products they want to buy and make the purchase, uses the following entities: user, product, category, sale

## Used technology
- nodejs
- express
- joi
- prettier
- eslint
- husky
- Json Web Token
- bcryptjs
- Babel
- CircleCI
- JsDocs

## Requirements
- Install Nodejs
- install mongoDB
## Download & Build on local

## From github
### Clone the repository, install node packages  and verify routes locally

```
//on local
git clone https://github.com/zowe/sample-node-api
cd sample-node-api
npm install
npm start
```
### Note: once the repository has been downloaded, a `.env` file must be added to the project's base path that has the following environment variables:
- DATABASE_URL
- PORT (optional)
- TOKEN_SECRET

Example:
```
DATABASE_URL = mongodb: // localhost / databaseexample
PORT = 3000
TOKEN_SECRET = randomCharaters123456
```

To get a response from any of the http resquests, you must do a single post with the registration and login addresses:
`https: // localhost: 3000 / register` post
`https: // localhost: 3000 / login` post

# Query params
- page : indicate the page you want to present, by default 1. write a number
- limit: indicate the limit of results per page, by default 5. write a number
- order: Indicate the order according to the name of the models, ascending or descending, by default ascending. Write asc | desc

Users registered as admin can access the creation, update and deletion of API resources while others can only view it

Open your local browser and try accessing
`https://localhost:3000/category/` get, post
`https://localhost:3000/category/:id`get, put, delete
`https://localhost:3000/product/` get, post
`https://localhost:18000/product/:id`get, put, delete


