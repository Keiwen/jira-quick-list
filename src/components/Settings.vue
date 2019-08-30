<template>
    <div>

        <div class="container-fluid">
            <div class="form-group row">
                <label for="newUrl" class="control-label col-4 col-md-2">URL:</label>
                <div class="input-group col-8 col-md-10">
                    <input type="text" id="newUrl" class="form-control"
                           v-model="login.url" @keyup.enter="confirmLogin()"/>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="form-group row">
                <label for="newUsername" class="control-label col-4 col-md-2">Username:</label>
                <div class="input-group col-8 col-md-10">
                    <input type="text" id="newUsername" class="form-control"
                           v-model="login.username" @keyup.enter="confirmLogin()"/>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="form-group row">
                <label for="newPassword" class="control-label col-4 col-md-2">Password:</label>
                <div class="input-group col-8 col-md-10">
                    <input type="password" id="newPassword" class="form-control"
                           v-model="login.password" @keyup.enter="confirmLogin()"/>
                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-4">
                <button @click="back()" class="btn btn-info"><icon name="arrow-left" /> Back</button>
            </div>
            <div class="col-8">
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'settings',
  data () {
    return {
      login: {}
    }
  },
  mounted () {
    this.login = JSON.parse(JSON.stringify(this.jiraLogin))
  },
  computed: {
    ...mapGetters(['jiraLogin'])
  },
  methods: {
    ...mapActions(['setJiraLogin']),
    confirmLogin () {
      this.setJiraLogin(this.login)
    },
    back () {
      this.$router.push({name: 'mainpage'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
