<template>
  <div class="boards">
    <h1>Welcome, {{activeUser.name}} <button class="btn btn-outline-danger logout" @click="logout">Logout</button></h1>
    <form @submit.prevent="addBoard">
      <input type="text" placeholder=" Title" v-model="newBoard.title" required>
      <input type="text" placeholder=" Description" v-model="newBoard.description">
      <button type="submit">Create Board</button>
    </form>
    <div v-for="board in boards" :key="board._id">
      <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}} </router-link>
      <button @click="deleteBoard(board._id)">Delete Board</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "boards",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      },
      activeUser() {
        return this.$store.state.user;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      },
      logout() {
        this.$store.dispatch('logout')
      }
    }
  };
</script>

<style>
  .logout {
    float: right;
  }
</style>