import Vue from 'vue'
import Router from 'vue-router'
import Boards from './views/Boards.vue'
import Board from './views/Board.vue'
import Login from './views/Login.vue'
import Lists from './views/Lists.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'boards',
      component: Boards
    },
    {
      path: '/board/:boardId',
      name: 'board',
      props: true,
      component: Board
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: "*",
      redirect: '/'
    },
    {
      path: '/board/:boardId/lists',
      name: 'lists',
      component: Lists
    },
  ]
})