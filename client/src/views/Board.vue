<template>
  <div class="container-fluid board mt-4">
    <div class="row">
      <div class="col-12">

        <div class="row">
          <div class="col d-flex justify-content-center active">
            <img class="active-img ml-0" :src="board.image" alt="">
            <h3 class="ml-3">{{board.title}}</h3>
            <h4 class="ml-3">{{board.description}}</h4>
            <h4 class="ml-3">{{board.updatedAt | formatTime}}</h4>
            <span @click="deleteBoard(board._id)"> <i class="fas fa-trash-alt fa-2x text-danger ml-3"></i></span>
            <span @click="editBoardForm = !editBoardForm"><i class="fas fa-pencil-alt fa-2x text-warning ml-3"></i>
            </span>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col mt-5">
            <form v-show="editBoardForm" @submit.prevent="editActiveBoard">
              <input class="" type="text" v-model="board.title" placeholder=" Change Title">
              <input class="ml-2" type="text" v-model="board.description" placeholder=" Change Description">
              <input class="ml-2" type="text" v-model="board.image" placeholder=" Change Image URL">
              <button class="btn btn-sm btn-outline-info ml-2 mb-1" type="submit">Submit</button>
            </form>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col mt-5">
            <form @submit.prevent="createList">
              <input class="" type="text" v-model="listName" placeholder=" List title">
              <button class="btn btn-sm btn-outline-info ml-2 mb-1" type="submit">Submit</button>
            </form>
          </div>
        </div>

        <div class="row">
          <div class="col-4 d-flex justify-content-center">
            <list v-for="list in lists" :listData='list'></list>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Moment from 'moment';
  // import Lists from "@/components/Lists.vue";

  export default {
    name: "board",
    mounted() {
      this.$store.dispatch('getLists')
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
      }
    },
    props: ["boardId"],
    methods: {
      deleteBoard(boardId) {
        this.$router.push({ name: 'boards' })
        this.$store.dispatch("deleteBoard", boardId);
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
      }
    },
    filters: {
      formatTime(date) {
        return Moment(String(date)).format("MMMM Do YYYY, h:mm a");
      }
    },
    components: {
      // Lists
    }

  };
</script>

<style scoped>
  .active-img {
    width: 10vw;
    height: 9vw;
  }

  .fas {
    cursor: pointer;
  }
</style>