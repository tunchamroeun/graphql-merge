const BookModel = require('../../models/book')
const AuthorModel = require('../../models/author')
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
    }
};
module.exports = bookResolver