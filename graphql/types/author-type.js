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
`;
module.exports = authorType