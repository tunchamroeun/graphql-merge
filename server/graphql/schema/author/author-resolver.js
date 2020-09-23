const AuthorModel = require('../../../models/author')
const BookModel = require('../../../models/book')
const authorResolver = {
    AuthorType: {
        books: (parent, args) => {
            return BookModel.find({author: parent._id})
        },
    },
    Query: {
        author: (parent, args) => {
            return AuthorModel.findById(args.id)
        },
        authors: () => {
            return AuthorModel.find()
        },
    },
    Mutation:{
        addAuthor:(parent,args)=>{
            let author = new AuthorModel(args);
            return author.save()
        }
    }
};
module.exports = authorResolver