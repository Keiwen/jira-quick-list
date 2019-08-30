<template>
  <div class="card-container container">
    <card v-for="card in cards" :key="card.id" :card="card"></card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Card from './Card'

export default {
  name: 'card-container',
  components: {Card},
  data () {
    return {}
  },
  computed: {
    cards: {
      get () {
        return this.$store.getters.currentProject.cards
      },
      set (reorderedCards) {
        this.reorderCard(reorderedCards)
      }
    }
  },
  methods: {
    ...mapActions(['reorderCard'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
