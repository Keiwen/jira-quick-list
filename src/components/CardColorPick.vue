<template>
  <div class="row color-pick-container text-center">

      <div class="col-3" v-for="color in cardColors">
          <div @click="pickColor(color)" class="color-pick btn btn-default" :style="{'--cardColor': color}">
              <icon name="check" v-if="current === color" />
          </div>
      </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'card-color-pick',
  props: ['current'],
  data () {
    return {
      pick: ''
    }
  },
  computed: {
    ...mapGetters(['cardColors'])
  },
  methods: {
    pickColor (key) {
      this.pick = key
      this.$emit('pick-color', key)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .color-pick {
        width: 45px;
        height: 45px;
        border-radius: 25px;
        border: 1px solid #CCCCCC;
        margin-bottom: 10px;
        padding-top: 8px;
        background-color: var(--cardColor);
    }
</style>
