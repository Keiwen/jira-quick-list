<template>
  <div class="edit-project container-fluid">

    <h2 v-if="project.id">Edit project</h2>
    <h2 v-else>Create project</h2>

    <div class="form-group row">
      <label for="newName" class="control-label col-4 col-md-2">Name:</label>
      <div class="input-group col-8 col-md-10">
        <input type="text" id="newName" class="form-control" maxlength="18"
               v-model="project.name" @keyup.enter="confirmEdit()"/>
      </div>
    </div>

    <button @click="remove()" v-if="project.id > 1" class="btn btn-danger"><icon name="trash" /> Remove</button>
    <button @click="cancelEdit()" class="btn btn-warning"><icon name="times" /> Cancel</button>
    <button @click="confirmEdit()" class="btn btn-success"><icon name="check" /> Save</button>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'filter-edit',
  components: {},
  data () {
    return {
      project: {
        id: 0,
        name: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getDefaultProject'])
  },
  mounted () {
    if (this.$route.params.project) {
      this.project.id = this.$route.params.project.id
      this.project.name = this.$route.params.project.name
    }
  },
  methods: {
    ...mapActions(['setProject', 'removeProject']),
    confirmEdit () {
      this.setProject(this.project)
      this.$router.push({name: 'projects'})
    },
    cancelEdit () {
      this.$router.push({name: 'projects'})
    },
    remove () {
      this.removeProject(this.project.id)
      this.$router.push({name: 'projects'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
