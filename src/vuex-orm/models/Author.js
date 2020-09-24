import {Model} from '@vuex-orm/core'
import Book from './Book'

export default class Author extends Model {
  static entity = 'authors'

  static fields() {
    return {
      _id: this.attr(null),
      name: this.attr(''),
      age: this.attr(''),
      books: this.hasMany(Book, 'author', '_id'),
    }
  }
}
