import {Model} from '@vuex-orm/core'
import Author from "./Author";

export default class Book extends Model {
  static entity = 'books'

  static fields() {
    return {
      _id: this.attr(null),
      name: this.attr(''),
      genre: this.attr(''),
      author: this.attr(null),
      author_relate: this.hasOne(Author, '_id', 'author')
    }
  }
}
