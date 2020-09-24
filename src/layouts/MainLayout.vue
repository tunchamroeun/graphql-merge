<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      :width="200"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import gql from 'graphql-tag'
import Author from "src/vuex-orm/models/Author";
import Book from "src/vuex-orm/models/Book";

const authorQuery = gql`
  query {
      authors{
          _id
          name
          age
      }
  }
`;
const bookQuery = gql`
  query {
      books{
          _id
          name
          genre
          author
      }
  }
`;
const linksData = [
  {
    title: 'Home',
    to: '/',
    icon: 'home',
  },
  {
    title: 'Author',
    to: '/author',
    icon: 'people',
  },
  {
    title: 'Book',
    to: '/book',
    icon: 'book',
  },
];
export default {
  name: 'MainLayout',
  components: {EssentialLink},
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  created() {
    this.$apollo.query({
      query: authorQuery
    }).then(function (data) {
      console.log(data)
      Author.insert({data: data.data.authors})
    })
    this.$apollo.query({
      query: bookQuery
    }).then(function (data) {
      Book.insert({data: data.data.books})
    })
  }
}
</script>
