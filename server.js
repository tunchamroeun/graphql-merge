const fs = require('fs');
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {makeExecutableSchema, mergeResolvers, mergeTypeDefs} = require('graphql-tools');
const app = express();
let registerResolvers = [];
const resolverDir = './graphql/resolvers';
fs.readdirSync(resolverDir).forEach(file => {
    registerResolvers = [...registerResolvers, require('./graphql/resolvers/' + file),]
});
let registerTypes = [];
const typeDir = './graphql/types';
fs.readdirSync(typeDir).forEach(file => {
    registerTypes = [...registerTypes, require('./graphql/types/' + file),]
});
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