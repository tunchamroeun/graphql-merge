const gql = require('graphql-tag')
const bookType = gql`
    type BookType{
        _id:ID
        name:String
        genre:String
        author:AuthorType
    }
    type Query {
        book(id:ID):BookType
        books:[BookType]
    }
`;
module.exports = bookType