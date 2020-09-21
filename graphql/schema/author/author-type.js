const gql = require('graphql-tag')
const authorType = gql`
    type AuthorType{
        _id:ID
        name:String
        age:Int
        books:[BookType]
    }
    type Query {
        author(id:ID):AuthorType
        authors:[AuthorType]
    }
    type Mutation{
        addAuthor(name:String!,age:Int!):AuthorType
    }
`;
module.exports = authorType