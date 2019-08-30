<template>
  <div class="edit-card container-fluid">

    <h2 v-if="card.id">Edit card</h2>
    <h2 v-else>Create card</h2>

    <div class="form-group row">
      <label for="newName" class="control-label col-4 col-md-2">Name:</label>
      <div class="input-group col-8 col-md-10">
        <input type="text" id="newName" class="form-control" maxlength="30"
               v-model="card.name" @keyup.enter="confirmEdit()"/>
      </div>
    </div>
    <div class="form-group row">
      <label for="newWorkload" class="control-label col-4 col-md-2">Workload:</label>
      <div class="input-group col-8 col-md-10">
        <input type="number" id="newWorkload" class="form-control"
               v-model="card.workload" @keyup.enter="confirmEdit()"/>
      </div>
    </div>
    <div class="form-group row">
      <card-color-pick @pick-color="pickColor" :current="card.color" />
    </div>

    <button @click="remove()" v-if="card.id" class="btn btn-danger"><icon name="trash" /> Remove</button>
    <button @click="cancelEdit()" class="btn btn-warning"><icon name="times" /> Cancel</button>
    <button @click="confirmEdit()" class="btn btn-success"><icon name="check" /> Save</button>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CardColorPick from './CardColorPick'

export default {
  name: 'card-edit',
  components: { CardColorPick },
  data () {
    return {
      card: {}
    }
  },
  computed: {
    ...mapGetters(['getDefaultCard', 'cardColors'])
  },
  mounted () {
    this.card = this.$route.params.card
    if (!this.card) this.card = this.getDefaultCard()
    this.card = JSON.parse(JSON.stringify(this.card))
  },
  methods: {
    ...mapActions(['setCard', 'removeCard']),
    confirmEdit () {
      this.setCard(this.card)
      this.$router.push({name: 'mainpage'})
    },
    cancelEdit () {
      this.$router.push({name: 'mainpage'})
    },
    remove () {
      this.removeCard(this.card.id)
      this.$router.push({name: 'mainpage'})
    },
    pickColor (pick) {
      this.card.color = pick
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
