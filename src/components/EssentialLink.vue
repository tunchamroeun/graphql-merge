<template>
  <q-item
    clickable
    :to="to"
    exact
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon"/>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },
    to: {
      type: String,
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
