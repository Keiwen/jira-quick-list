import Vue from 'vue'
import Router from 'vue-router'
import Mainpage from '@/components/Mainpage'
import FilterEdit from '@/components/FilterEdit'
import FilterContainer from '@/components/FilterContainer'
import Settings from '@/components/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainpage',
      component: Mainpage
    // },
    // {
    //   path: '/edit-card',
    //   name: 'edit-card',
    //   component: CardEdit
    },
    {
      path: '/filters',
      name: 'filters',
      component: FilterContainer
    },
    {
      path: '/edit-filter',
      name: 'edit-filter',
      component: FilterEdit
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
