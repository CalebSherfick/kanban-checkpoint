<template>
  <div class="row board mt-4">
    <div class="col-12">

      <div class="row">
        <div class="col-8 offset-2 d-flex justify-content-center">
          <img class="active-img" :src="board.image" alt="">
          <h3 class="ml-3">{{board.title}}</h3>
          <h4 class="ml-3">{{board.description}}</h4>
          <h4 class="ml-3">{{board.updatedAt}}</h4>
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

      <!-- <div class="row">
        <list v-for="list in lists" :listData='list'></list>
      </div> -->

    </div>
  </div>
</template>

<script>
  export default {
    name: "board",
    data() {
      return {
        editBoardForm: false
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
      }
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