const express = require('express');
const glob = require("glob");
const {graphqlHTTP} = require('express-graphql');
const {makeExecutableSchema, mergeResolvers, mergeTypeDefs} = require('graphql-tools');
const app = express();
let resolvers = glob.sync('graphql/*/*/*-resolver.js')
let registerResolvers = [];
for (const resolver of resolvers){
    registerResolvers = [...registerResolvers, require('./'+resolver),]
}
let types = glob.sync('graphql/*/*/*-type.js')
let registerTypes = [];
for (const type of types){
    registerTypes = [...registerTypes, require('./'+type),]
}
const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs(registerTypes),
    resolvers: mergeResolvers(registerResolvers,)
})
// mongodb connection
require('./helpers/connection');
// end mongodb connection
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');