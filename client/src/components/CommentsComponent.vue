<template>
  <li>{{comment.description}}</li>
</template>

<script>
  export default {
    name: "commentsComponent",
    mounted() { },
    props: ["comment"],
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
    props: ["task", "list"],
    methods: {
      deleteTask(taskId) {
        let activeBoardId = this.activeBoard._id;
        let listId = this.task.listId;
        this.$store.dispatch("deleteTask", {
          endpoint: `boards/${activeBoardId}/lists/${listId}/tasks/`,
          data: taskId
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