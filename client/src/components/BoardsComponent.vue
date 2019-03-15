<template>
  <div class="boards-component">
    <div class="row mt-5">
      <div class="col-3 d-flex justify-content-center" v-for="board in boards" :key="board._id">
        <div class="card mb-3"
          @click="setActiveBoard(board); $router.push({name: 'board', params: {boardId: board._id}})">
          <img class="card-img-top" :src="board.image" alt="Card image cap">
          <div class="card-body">
            <h4 class="card-title text-center">{{board.title}}</h4>
            <p class="card-text text-center">{{board.description}}</p>
            <p class="card-text text-center">Created: {{board.createdAt | formatTime}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Moment from 'moment';

  export default {
    name: "boardsComponent",
    props: [],
    data() {
      return {};
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      setActiveBoard(board) {
        this.$store.dispatch("setActiveBoard", board);
      }
    },
    components: {},
    filters: {
      formatTime(date) {
        return Moment(String(date)).format("MMMM Do YYYY, h:mm a");
      }
    }
  };
</script>

<style>
  .card {
    cursor: pointer;
    background-color: rgb(228, 227, 227);
  }
</style>