<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapGetters(['messageBag'])
  },
  watch: {
    messageBag: function (newValue, oldValue) {
      const messageManager = this.$toast
      this.nextMessage().then(
        function (data) {
          // on success
          if (data.type) {
            switch (data.type) {
              case 'success':
                messageManager.success(data)
                break
              case 'warn':
              case 'warning':
                messageManager.warn(data)
                break
              case 'error':
              case 'danger':
                messageManager.error(data)
                break
              default:
                messageManager.info(data)
            }
          }
        },
        function (data) {
          // on failure
        }
      )
    }
  },
  methods: {
    ...mapActions(['nextMessage'])
  }
}
</script>

<style>
body {
  margin: 0;
  text-align: center;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
/**
blue #2684FF
dark blue #0052CC
yellow #FCDE02
**/
</style>
