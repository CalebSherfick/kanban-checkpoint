<template>
  <div class="boards container-fluid">
    <div class="row">
      <div class="col-12 text-center mt-4">
        <h1 class="ml-5">Welcome {{activeUser.name}} <button class="btn btn-outline-danger logout mr-3 shadow"
            @click="logout">Logout</button></h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 d-flex justify-content-center mt-4">
        <h5 class="mr-5">Make a new board</h5>
      </div>
    </div>
    <div class="row mt-1">
      <div class="col-12 d-flex justify-content-center">
        <form @submit.prevent="addBoard">
          <input type="text" placeholder=" Title" v-model="newBoard.title" required>
          <input type="text" placeholder=" Description" v-model="newBoard.description" class="ml-2">
          <input type="text" placeholder=" Image URL" v-model="newBoard.image" class="ml-2">
          <button type="submit" class="btn btn-sm btn-outline-dark shadow ml-2">Create Board</button>
        </form>
      </div>
    </div>
    <boards-component></boards-component>
  </div>
</template>

<script>
  import BoardsComponent from "@/components/BoardsComponent.vue";

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
          description: "",
          image: ""
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
      logout() {
        this.$store.dispatch('logout')
      }
    },
    components: {
      BoardsComponent
    }
  };
</script>

<style scoped>
  .logout {
    float: right;
  }
</style>