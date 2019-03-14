<template>
  <div class="col-10 offset-1">
    <div class="card shadow mb-4 task-card">
      <img class="card-img-top img-fluid" :src="task.image" alt>
      <div class="card-body d-flex justify-content-center">
        <div class="row">
          <div class="col-12 d-flex justify-content-center">
            <h4 class="card-title">{{task.title}}</h4>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <button
            @click="showComments = !showComments"
            v-if="!showComments"
            class="btn btn-outline-dark shadow"
          >Comments</button>
          <button
            @click="showComments = !showComments"
            v-if="showComments"
            class="btn btn-outline-dark shadow"
          >Hide Comments</button>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <form v-if="showComments" @submit.prevent="createComment(task._id)">
            <textarea
              class="comment-input mt-4 ml-2"
              type="text"
              v-model="description"
              placeholder=" Comment"
            ></textarea>
            <br>
            <button
              class="btn btn-sm btn-outline-info ml-2 mt-2 shadow mt-0"
              type="submit"
            >Create Comment</button>
          </form>
        </div>
      </div>

      <div class="card-text">
        <div class="row">
          <div class="col-12">
            <ul>
              <comments-component v-for="comment in tasks.comments" :comment="comment"></comments-component>
            </ul>
          </div>
        </div>
      </div>

      <!-- delete entire list -->
      <i
        @click="deleteTask(task._id)"
        class="fas fa-trash-alt text-danger mr-2 mb-2 d-flex justify-content-end"
      ></i>
    </div>
  </div>
</template>

<script>
import CommentsComponent from "@/components/CommentsComponent.vue";

export default {
  name: "tasksComponent",
  mounted() {},
  props: [],
  data() {
    return {
      showComments: false,
      description: ""
    };
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
    },
    createComment(taskId) {
      let activeBoardId = this.activeBoard._id;
      let listId = this.task.listId;
      let newComment = {
        description: this.description
      };
      this.$store.dispatch("createComment", {
        endpoint: `boards/${activeBoardId}/lists/${listId}/tasks/${taskId}/comments`,
        data: newComment
      });
    }
  },
  components: { CommentsComponent }
};
</script>

<style scoped>
.task-card {
  background-color: rgb(228, 227, 227);
}

.comment-input {
  width: 95% !important;
}
</style>