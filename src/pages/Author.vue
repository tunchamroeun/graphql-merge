<template>
  <q-page>
    <div class="row q-gutter-x-md">
      <q-input class="col" v-model="name" label="Name"/>
      <q-input type="number" class="col" v-model="age" label="Age"/>
      <q-btn label="Save" @click="saveAuthor"/>
    </div>
    <q-virtual-scroll
      :items="Object.freeze(authors)"
      separator
    >
      <template v-slot="{ item, index }">
        <q-item
          :key="index"
          dense
        >
          <q-item-section>
            <q-item-label>
              #{{ index }} - Name: {{ item.name }} - Age: {{ item.age }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-virtual-scroll>
  </q-page>
</template>

<script>
import Author from "src/vuex-orm/models/Author";

export default {
  name: "Author",
  data() {
    return {
      name: null,
      age: null
    }
  },
  computed: {
    authors() {
      return Author.query().with('books').get()
    }
  },
  methods: {
    saveAuthor() {
      Author.insert({data: {_id: '09209rioweo', name: 'Cham Roeun', age: 22}})
    },
  },
}
</script>

<style scoped>

</style>
