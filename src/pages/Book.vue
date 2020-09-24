<template>
  <q-page>
    <q-virtual-scroll
      :items="Object.freeze(books)"
      separator
    >
      <template v-slot="{ item, index }">
        <q-item
          :key="index"
          dense
        >
          <q-item-section>
            <q-item-label>
              #{{ index }} - {{ item.name }} - {{ item.genre }} - Author {{ item.author_relate.name }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-virtual-scroll>
  </q-page>
</template>

<script>
import Book from "src/vuex-orm/models/Book";

export default {
  name: "Book",
  computed: {
    books() {
      return Book.query().with('author_relate').get()
    }
  }
}
</script>

<style scoped>

</style>
