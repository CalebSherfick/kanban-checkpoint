<template>
  <div class="boards-component">
    <div class="row mt-5">
      <div class="col-3 d-flex justify-content-center" v-for="board in boards" :key="board._id">
        <div
          class="card"
          @click="setActiveBoard(board._id); $router.push({name: 'board', params: {boardId: board._id}})"
        >
          <img class="card-img-top" :src="board.image" alt="Card image cap">
          <div class="card-body">
            <h4 class="card-title">{{board.title}}</h4>
            <p class="card-text">{{board.description}}</p>
            <button
              class="btn btn-sm btn-outline-danger shadow"
              @click="deleteBoard(board._id)"
            >Delete Board</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    setActiveBoard(id) {
      this.$store.dispatch("setActiveBoard", id);
    }
  },
  components: {}
};
</script>

<style>
.card {
  cursor: pointer;
}
</style>
