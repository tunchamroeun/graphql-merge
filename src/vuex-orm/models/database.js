import VuexORM from '@vuex-orm/core'
import Author from "src/vuex-orm/models/Author";
import Book from "src/vuex-orm/models/Book";
// Create a new instance of Database.
const database = new VuexORM.Database()
// Register Models to Database.
database.register(Author)
database.register(Book)
export default database
