<template>
  <div class="container-fluid board mt-4">
    <div class="row">
      <div class="col-12">

        <div class="row">

          <div class="col-3">
            <i @click="" class="fas fa-home ml-3 fa-2x mt-2 text-primary home"></i>
          </div>

          <div class="col-6 active">
            <div class="card shadow">
              <div class="row ">
                <div class="col-md-4">
                  <img :src="board.image" class="w-100 h-100">
                </div>
                <div class="col-md-8 px-3">
                  <div class="card-block px-3">
                    <h4 class="card-title mt-3">{{board.title}}
                      <i @click="editBoardForm = !editBoardForm"
                        class="fas fa-pencil-alt text-warning d-flex pencil"></i>
                    </h4>
                    <p class="card-text">{{board.description}}</p>
                    <p class="card-text">{{board.updatedAt | formatTime}}</p>
                    <span @click="deleteBoard(board._id)"> <i
                        class="fas fa-trash-alt text-danger fa-2x d-flex justify-content-end mb-2"></i></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-3 mt-1">
            <button v-if="!editBoardForm" class="btn btn-outline-danger logout mr-3 shadow"
              @click="logout">Logout</button>
            <form v-if="editBoardForm" @submit.prevent="editActiveBoard">
              <div>
                <input class="card-edit" type="text" v-model="board.title" placeholder=" Change Title">
              </div>
              <div>
                <input class="card-edit mt-2" type="text" v-model="board.description" placeholder=" Change Description">
              </div>
              <div>
                <input class="card-edit mt-2" type="text" v-model="board.image" placeholder=" Change Image URL">
              </div>
              <button class="btn btn-sm btn-outline-info mt-2 shadow" type="submit">Submit</button>
            </form>
          </div>
        </div>


        <div class="row">
          <div class="col-12 d-flex justify-content-center mt-5">
            <h5>Make a new list</h5>
          </div>
        </div>

        <div class="row">
          <div class="col-12 d-flex justify-content-center">
            <form @submit.prevent="createList">
              <input class="shadow list-input" type="text" v-model="listName" placeholder=" List title">
              <button class="btn btn-sm btn-outline-info ml-2 mb-1 shadow" type="submit">Submit</button>
            </form>
          </div>
        </div>

        <div class="row my-5">
          <lists-component v-for="list in lists" :list="list"></lists-component>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  import Moment from 'moment';
  import ListsComponent from "@/components/ListsComponent.vue";
  import TasksComponent from "@/components/TasksComponent.vue";

  export default {
    name: "board",
    mounted() {
      let id = this.board._id
      this.$store.dispatch('getLists', {
        endpoint: `boards/${id}/lists`
      });
      let listId = this.lists._id
      this.$store.dispatch('getTasks', {
        endpoint: `boards/${id}/lists/${listId}/tasks`
      })
      //write a get tasks
    },
    data() {
      return {
        editBoardForm: false,
        listName: ''
      }
    },
    computed: {
      board() {
        return this.$store.state.boards.find(b => b._id == this.boardId) || { title: 'Loading...' }
      },
      lists() {
        return this.$store.state.lists;
      }
    },
    props: ["boardId"],
    methods: {
      deleteBoard(boardId) {
        let message = confirm("Are you sure you want to delete this board and all of it's contents?");
        if (message == true) {
          this.$router.push({ name: 'boards' })
          this.$store.dispatch("deleteBoard", boardId);
        }
      },
      editActiveBoard() {
        this.$store.dispatch('editActiveBoard', this.board);
        event.target.reset()
      },
      createList() {
        //find board id
        let id = this.board._id
        //grab listName data from above data and input form to create list
        let listName = this.listName
        this.$store.dispatch('create', {
          endpoint: `boards/${id}/lists`,
          //pointing to array of lists in store.state
          resource: 'lists',
          data: { listName }
        })
        event.target.reset()
      },
      logout() {
        this.$store.dispatch('logout')
      }
    },
    filters: {
      formatTime(date) {
        return Moment(String(date)).format("MMMM Do YYYY, h:mm a");
      }
    },
    components: {
      ListsComponent
    }

  };
</script>

<style scoped>
  .card-edit {
    width: 100%;
  }

  .list-input {
    width: 20vw;
  }

  .fas {
    cursor: pointer;
  }

  .pencil {
    float: right;
  }

  .logout {
    float: right;
  }
</style>