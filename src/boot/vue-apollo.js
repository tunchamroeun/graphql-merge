import {ApolloClient} from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/graphql',
})

// Cache implementation
const cache = new InMemoryCache({
  addTypename: true
})
// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})
export default async ({app, Vue}) => {
  Vue.use(VueApollo)
  app.apolloProvider = apolloProvider
}
