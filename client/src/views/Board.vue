<template>
  <div class="row board mt-4">
    <div class="col-8 offset-2 d-flex justify-content-center">
      <img class="active-img" :src="board.image" alt="">
      <h3>{{board.title}}</h3>
      <h4>{{board.description}}</h4>
      <h4>{{board.updatedAt}}</h4>
      <span @click="deleteBoard(board._id)"> <i class="fas fa-trash-alt fa-2x text-danger"></i></span>
      <i class="fas fa-pencil-alt fa-2x text-warning"></i>

      <list v-for="list in lists" :listData='list'></list>
    </div>
  </div>
</template>

<script>
  export default {
    name: "board",
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
      }
    }

  };
</script>

<style scoped>
  .active-img {
    width: 10vw;
    height: 9vw;
  }
</style>