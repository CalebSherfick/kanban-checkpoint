import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

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
    lists: [],
    tasks: {}
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
        state[payload.resource[payload.data]] = payload.data
      }
    },
    setTasks(state, tasks) {
      //tasks is an array
      // [{listID: 38wf8, ...}, {listID: 38wf8, ...}, {listID: 4lkgj, ...}]
      let dict = {}
      //loop here
      for (let i = 0; i < tasks.length; i++) {
        let obj = tasks[i]
        if (!dict[obj.listId]) {
          dict[obj.listId] = []
        }
        dict[obj.listId].push(obj)
      }
      state.tasks = dict
    }
    /**
     * {
     *  38wf8: [{listID: 38wf8, ...}, {listID: 38wf8, ...}],
     * 4lkgj: [{listID: 4lkgj, ...}]
     * }
     */
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

    //universal create method used for lists and tasks
    create({ commit, dispatch }, payload) {
      api.post(payload.endpoint, payload.data)
        .then(res => {
          if (payload.resource == 'tasks') {
            dispatch('getTasks', payload)
          } else {
            commit('addResource', {
              resource: payload.resource,
              data: res.data
            })
          }
        })
    },

    getLists({ commit, dispatch }, payload) {
      if (!payload) return commit('setLists', [])
      api.get(payload.endpoint)
        .then(res => {
          commit('setLists', res.data)
        })
    },

    editListName({ commit, dispatch }, payload) {
      debugger
      api.put(payload.endpoint + payload.list._id, payload.list.listName)
        .then(res => {
          dispatch('getLists', payload)
        })
    },

    deleteList({ commit, dispatch }, payload) {
      api.delete(payload.endpoint + payload.listId)
        .then(res => {
          dispatch('getLists', payload)
        })
    },

    //#endregion

    //#region -- TASKS --

    //create Task is done in create method within lists above

    getTasks({ commit, dispatch }, payload) {
      api.get(payload.endpoint)
        .then(res => {
          commit('setTasks', res.data)
        })
    },
    deleteTask({ commit, dispatch }, payload) {
      api.delete(payload.endpoint + payload.data)
        .then(res => {
          dispatch('getTasks', payload)
        })
    },

    //#endregion

    //#region -- COMMENTS --

    //create a new comment on a task with a put
    createComment({ commit, dispatch }, payload) {
      debugger
      api.put(payload.endpoint, payload.data)
        .then(res => {
          console.log(res.data)
        })
    }

    //#endregion


  }
})
