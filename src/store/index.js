import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import database from "src/vuex-orm/models/database";
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
Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    plugins,
    modules: {},
    strict: process.env.DEV
  })

  return Store
}
