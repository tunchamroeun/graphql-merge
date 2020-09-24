import VuexORM from '@vuex-orm/core'
import VuexORMGraphQL from '@vuex-orm/plugin-graphql'

const options = {
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  },
  connectionQueryMode: 'nodes',
  database: database,
  url: 'http://localhost:4000/graphql',
  includeExtensions: true,
  debug: process.env.NODE_ENV !== 'production'
}
VuexORM.use(VuexORMGraphQL, options)

export const plugins = [
  VuexORM.install(database)
]
export default async (/* { app, router, Vue ... } */) => {
  // something to do
}
