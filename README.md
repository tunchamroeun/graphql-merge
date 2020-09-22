### Run project
`yarn install or npm install` to install dependencies
`npm start` to start
### Screenshot
[![Screenshot](https://i.stack.imgur.com/mBmb5.png "Screenshot")](https://i.stack.imgur.com/mBmb5.png "Screenshot")
### Code example in your server file
```javascript
const express = require('express');
const glob = require("glob");
const {graphqlHTTP} = require('express-graphql');
const {makeExecutableSchema, mergeResolvers, mergeTypeDefs} = require('graphql-tools');
const app = express();
//iterate through resolvers file in the folder "graphql/folder/folder/whatever*-resolver.js"
let resolvers = glob.sync('graphql/*/*/*-resolver.js')
let registerResolvers = [];
for (const resolver of resolvers){
// add resolvers to array
    registerResolvers = [...registerResolvers, require('./'+resolver),]
}
//iterate through resolvers file in the folder "graphql/folder/folder/whatever*-type.js"
let types = glob.sync('graphql/*/*/*-type.js')
let registerTypes = [];
for (const type of types){
// add types to array
    registerTypes = [...registerTypes, require('./'+type),]
}
//make schema from typeDefs and Resolvers with "graphql-tool package (makeExecutableSchema)"
const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs(registerTypes),//merge array types
    resolvers: mergeResolvers(registerResolvers,)//merge resolver type
})
// mongodb connection if you prefer mongodb
require('./helpers/connection');
// end mongodb connection
//Make it work with express "express and express-graphql packages"
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,//test your query or mutation on browser (Development Only)
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
```
