import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import { createContext } from 'vm';

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, board) {
      state.activeBoard = board
    },
    setLists(state, lists) {
      state.lists = lists
    },
    addResource(state, payload) {
      if (Array.isArray(state[payload.resource])) {
        state[payload.resource].push(payload.data)
      } else {
        state[payload.resource] = payload.data
      }
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
        .catch(res => {
          router.push({ name: 'login' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'login' })
        })
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
          dispatch('setActiveBoard', {})
        })
    },

    //#endregion

    //#region -- ActiveBoard --
    setActiveBoard({ commit, dispatch }, board) {
      commit('setActiveBoard', board)
    },
    editActiveBoard({ commit, dispatch, state }, payload) {
      api.put('boards/' + payload._id, payload)
        .then(res => {
          console.log(res.data)
          commit('setActiveBoard', res.data)
        })
    },


    //#endregion



    //#region -- LISTS --
    create({ commit, dispatch }, payload) {
      api.post(payload.endpoint, payload.data)
        .then(res => {
          commit('addResource', {
            resource: payload.resource,
            data: res.data
          })
        })
    },

    getLists({ commit, dispatch }, payload) {
      api.get(payload.endpoint)
        .then(res => {
          commit('setLists', res.data)
        })
    }


    //#endregion
  }
})
