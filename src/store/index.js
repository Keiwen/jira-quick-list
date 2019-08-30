import Vue from 'vue'
import Vuex from 'vuex'
import messageBag from './modules/messageBag'
import createLogger from '../../node_modules/vuex/dist/logger'
import * as types from './mutation-types'
// import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// const persistOptions = {
//   key: 'keiwen-jqlist'
// }

const defaultFilter = {
  id: 0,
  editable: false
}

const jiraRequestConfig = {
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:8080'
  }
}

export default new Vuex.Store({
  state: {
    jiraLogin: {
      url: '',
      username: '',
      password: '',
      logged: false
    },
    jiraConstants: {
      loginUrl: '/auth/1/session'
    },
    currentFilterId: 0,
    filters: {}
  },
  getters: {
    jiraLogin: state => state.jiraLogin,
    jiraLogged: state => state.jiraLogin.logged,
    filters: state => {
      let filterList = []
      for (let filterId in state.filters) {
        if (Object.prototype.hasOwnProperty.call(state.filters, filterId)) {
          filterList.push(state.filters[filterId])
        }
      }
      return filterList
    },
    getDefaultJiraRequestConfig: state => () => JSON.parse(JSON.stringify(jiraRequestConfig)),
    getJiraLoginUrl: state => (baseUrl) => {
      if (typeof baseUrl === 'undefined') baseUrl = state.jiraLogin.url
      return baseUrl + state.jiraConstants.loginUrl
    },
    getDefaultFilter: state => () => JSON.parse(JSON.stringify(defaultFilter)),
    getFilter: (state, getters) => (filterId) => {
      if (typeof filterId === 'undefined') filterId = state.currentFilterId
      if (typeof state.filters[filterId] === 'undefined') return getters.getDefaultFilter()
      return state.filters[filterId]
    },
    currentFilter: (state, getters) => getters.getFilter()
  },
  actions: {
    setJiraLogin ({state, getters, dispatch, commit}, loginData) {
      let checkData = JSON.parse(JSON.stringify(state.jiraLogin))
      if (typeof loginData.url !== 'undefined') {
        checkData.url = loginData.url.trim().replace(/\/$/, '')
      }
      if (typeof loginData.username !== 'undefined') checkData.username = loginData.username
      if (typeof loginData.password !== 'undefined') checkData.password = loginData.password

      if (loginData.url.length <= 0) {
        dispatch('addError', 'No JIRA url provided')
        return
      }
      const loginUrl = getters.getJiraLoginUrl(loginData.url)
      let requestConfig = getters.getDefaultJiraRequestConfig()
      // requestConfig.headers['Authorization'] = 'Basic ' + btoa(checkData.username + ':' + checkData.password)
      requestConfig.params = {username: checkData.username, password: checkData.password}
      return new Promise((resolve, reject) => {
        let request = Vue.http.post(loginUrl, requestConfig)
        console.log(request)
        request.then(
          (response) => {
            dispatch('addSuccess', 'OK from JIRA')
            resolve(response.body)
          },
          (response) => {
            console.log('failed', response, 'request included', requestConfig)
            reject(response)
            dispatch('addError', 'Cannot login to JIRA')
          }
        )
      })

      // commit(types.SET_JIRA_LOGIN, checkData)
    },
    loginJira ({state, getters, dispatch}) {
      if (state.jira_data.url.length <= 0) {
        dispatch('addError', 'No JIRA URL provided')
        return
      }
      return new Promise((resolve, reject) => {
        Vue.http.get(getters.jira_login_url).then(
          (response) => {
            resolve(response.body)
          },
          (response) => {
            reject(response)
            dispatch('addError', 'Cannot login to jira')
          }
        )
      })
    },
    setFilter ({getters, commit}, filterData) {
      // be sure to have id
      if (filterData.id === undefined) filterData.id = 0

      commit(types.SET_FILTER, filterData)
    },
    removeFilter ({getters, commit}, filterId) {
      commit(types.REMOVE_FILTER, filterId)
    },
    pickFilter ({getters, commit}, filterId) {
      const filter = getters.getFilter(filterId)
      if (filter.id === 0) return

      commit(types.PICK_FILTER, filterId)
    }
  },
  mutations: {
    [types.SET_JIRA_LOGIN] (state, loginData) {
      state.jiraLogin = loginData
    },
    [types.SET_FILTER] (state, filterData) {
      if (typeof state.filters[filterData.id] === 'undefined') {
        // create
        let filter = JSON.parse(JSON.stringify(defaultFilter))
        state.filters[filter.id] = filter
        state.currentFilterId = filter.id
      } else {
        // create
      }
    },
    [types.REMOVE_FILTER] (state, filterId) {
      delete state.filters[filterId]
      state.currentFilterId = 0
    },
    [types.PICK_FILTER] (state, filterId) {
      state.currentFilterId = filterId
    }
  },
  modules: {
    messageBag
  },
  strict: debug,
  // plugins: debug ? [createLogger(), persistedState(persistOptions)] : [persistedState(persistOptions)]
  plugins: debug ? [createLogger()] : []
})
