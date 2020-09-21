const BookModel = require('../../../models/book')
const AuthorModel = require('../../../models/author')
const bookResolver = {
    BookType: {
        author: (parent, args) => {
            return AuthorModel.findById(parent.author)
        },
    },
    Query: {
        book: (parent, args) => {
            return BookModel.findById(args.id)
        },
        books: () => {
            return BookModel.find()
        },
    },
    Mutation: {
        addBook:(parent,args)=>{
            let book = new BookModel(args)
            return book.save()
        }
    }
};
module.exports = bookResolver