<template>
  <div class="card col-sm-6 text-center" :style="{'--cardColor': card.color}">
      <div class="row">
          <div class="col-3">
              <div class="card-side card-handle ddHandle btn btn-outline-primary">
                  <icon name="arrows-alt" scale="1.5" />
              </div>
          </div>
          <div class="col-6 card-body vertical-align">
              <div>{{card.name}}</div>
          </div>
          <div class="col-3">
              <router-link :to="{ name: 'edit-card', params: {card: card} }"
                           class="card-side card-edit card-workload btn btn-outline-primary">
                  {{card.workload}}
              </router-link>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: ['card'],
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .card {
        margin-bottom: 5px;
        border-radius: 25px;
        height: 55px;
        background-color: var(--cardColor);
        .card-side {
            position: absolute;
            top: 0;
            width: 55px;
            height: 55px;
            border-radius: 25px;
            &.ddHandle svg {
                margin-top: 7px;
            }
        }
        .card-body {
            height: 51px;
        }
        .card-handle {
            left: 0;
        }
        .card-edit {
            right: 0;
            padding-top: 15px;
        }
    }
</style>
