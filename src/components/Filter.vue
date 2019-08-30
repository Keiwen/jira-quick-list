<template>
  <div class="project col-sm-6">
      <div class="row vertical-align">
          <div class="col-7">
              {{project.name}}
          </div>
          <div class="col-3">
              <span v-if="isCurrent">Current</span>
              <button @click="selectProject()" class="btn btn-outline-success" v-else>
                  <icon name="arrow-alt-circle-left" />
              </button>
          </div>
          <div class="col-2">
              <router-link :to="{ name: 'edit-project', params: {project: project} }" class="btn btn-outline-primary">
                  <icon name="pencil-alt" />
              </router-link>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'filter',
  props: ['project'],
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['currentProject']),
    isCurrent () {
      return this.currentProject.id === this.project.id
    }
  },
  methods: {
    ...mapActions(['pickProject']),
    selectProject () {
      this.pickProject(this.project.id)
      this.$router.push({name: 'mainpage'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .project .row {
        height: 42px;
    }
</style>
