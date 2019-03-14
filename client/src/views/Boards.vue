<template>
  <div class="boards">
    <div class="container-fluid">
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
            <input type="text" placeholder=" Title" v-model="newBoard.title" required class="board-input">
            <input type="text" placeholder=" Description" v-model="newBoard.description" class="ml-2" id="desc">
            <input type="text" placeholder=" Image URL" v-model="newBoard.image" class="ml-2 board-input" id="img">
            <button type="submit" class="btn btn-sm btn-outline-dark shadow ml-2">Create Board</button>
          </form>
        </div>
      </div>

      <boards-component></boards-component>

    </div>
    <footer class="text-white bg-dark d-flex justify-content-center align-items-center">
      <h4>Made by Caleb and Brett</h4>
    </footer>
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

  input[type="text"].board-input::-webkit-input-placeholder {
    color: rgb(7, 130, 245);
    font-weight: 500;
    width: 200px;
  }

  input[type="text"]#desc::-webkit-input-placeholder {
    color: rgb(7, 245, 39);
    font-weight: 500;
    width: 200px;
  }

  input[type="text"]#img::-webkit-input-placeholder {
    color: rgb(245, 150, 7);
    font-weight: 500;
    width: 200px;
  }

  footer {
    margin-top: 13vh;
    height: 30vh;
  }
</style>