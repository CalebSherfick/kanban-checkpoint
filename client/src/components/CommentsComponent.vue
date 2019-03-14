<template>
  <li class="mt-1">{{comment.description}} <i @click="deleteComment(comment.listId, comment.taskId, comment._id)"
      class="fas fa-trash-alt text-danger ml-1"></i>
  </li>
</template>

<script>
  export default {
    name: "commentsComponent",
    mounted() { },
    props: ["list", "task", "comment"],
    data() {
      return {};
    },
    computed: {
      activeBoard() {
        return this.$store.state.activeBoard;
      },
      tasks() {
        return this.$store.state.tasks;
      }
    },
    methods: {
      deleteComment(listId, taskId, commentId) {
        let activeBoardId = this.activeBoard._id;
        this.$store.dispatch("deleteComment", {
          endpoint: `boards/${activeBoardId}/lists/${listId}/tasks/`,
          data: { taskId, commentId }
        });
      }
    },
    components: {}
  };
</script>

<style scoped>
  .task-card {
    background-color: rgb(228, 227, 227);
  }
</style>