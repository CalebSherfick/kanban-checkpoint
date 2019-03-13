<template>
  <div class="col-10 offset-1">
    <div class="card shadow mb-4">
      <img class="card-img-top img-fluid" :src="task.image" alt="">
      <div class="card-body d-flex justify-content-center">
        <h4 class="card-title">{{task.title}}</h4>
      </div>
      <i @click="deleteTask(task._id)" class="fas fa-trash-alt text-danger mr-2 mb-2 d-flex justify-content-end"></i>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: "tasksComponent",
    mounted() {
      this.$store.dispatch("getTasks");
    },
    props: [],
    data() {
      return {};
    },
    computed: {
      activeBoard() {
        return this.$store.state.activeBoard
      },
      tasks() {
        return this.$store.state.tasks
      }
    },
    props: ["task", "list"],
    methods: {
      deleteTask(taskId) {
        let activeBoardId = this.activeBoard._id
        let listId = this.task.listId
        this.$store.dispatch('deleteTask', { endpoint: `boards/${activeBoardId}/lists/${listId}/tasks/`, data: taskId })
      }
    },
    components: {}
  };
</script>