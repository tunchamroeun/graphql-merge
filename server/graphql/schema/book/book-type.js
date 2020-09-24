const gql = require('graphql-tag')
const bookType = gql`
  type BookType{
    _id:ID
    name:String
    genre:String
    author:ID
    author_relate:AuthorType
  }
  type Query {
    book(id:ID):BookType
    books:[BookType]
  }
  type Mutation{
    addBook(name:String!,genre:String!,author:ID!):BookType
  }
`;
module.exports = bookType
