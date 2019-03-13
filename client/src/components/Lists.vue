<template>
  <div class="lists-component">
    <div class="row my-5">
      <div class="col-3 d-flex justify-content-center" v-for="list in lists" :key="list._id">
        <div class="card shadow mb-3">
          <div class="card-body d-flex justify-content-center">
            <h4 v-if="editListForm == false" class="card-title mt-2 tex-center">{{list.listName}}
              <!-- <i
                @click="editListForm = true" class="fas fa-pencil-alt text-warning ml-5"></i>-->
            </h4>
            <!-- edit list name commented out for now -->
            <form v-else="editListForm == true" @submit.prevent="editListName(list)">
              <input class="" type="text" v-model="list.listName" placeholder=" Change Title">
              <button class="btn btn-sm btn-outline-info ml-2 mb-1" type="submit">Submit</button>
            </form>

            <div class="row">
              <div class="col-12 d-flex justify-content-center">
                <button v-if="!taskForm" @click="taskForm = !taskForm"
                  class="btn btn-sm btn-outline-success shadow">Create
                  Task</button>
                <button v-else="taskForm" @click="taskForm = !taskForm" class="btn btn-sm btn-outline-dark shadow">Hide
                  Form</button>

                <form v-if="taskForm" @submit.prevent="createTask(list._id)">
                  <input class="" type="text" v-model="newTask.title" placeholder=" Task Title">
                  <input class="" type="text" v-model="newTask.image" placeholder=" Task Image URL">
                  <button class="btn btn-sm btn-outline-info ml-2 mb-1" type="submit">Submit</button>
                </form>
              </div>
            </div>

          </div>
          <hr>
          <div class="card-text">
            <tasks-component></tasks-component>
          </div>
          <i @click="deleteList(list._id)"
            class="fas fa-trash-alt text-danger mr-2 mb-2 d-flex justify-content-end"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TasksComponent from "@/components/Tasks.vue";
  export default {
    name: "listsComponent",
    data() {
      return {
        editListForm: false,
        taskForm: false,
        listName: '',
        newTask: {
          title: '',
          image: ''
        }
      };
    },
    computed: {
      lists() {
        return this.$store.state.lists;
      },
      activeBoard() {
        return this.$store.state.activeBoard
      }
    },
    methods: {
      deleteList(listId) {
        let activeBoardId = this.activeBoard._id
        this.$store.dispatch("deleteList", { endpoint: `boards/${activeBoardId}/lists/`, listId });
      },
      editListName(list) {
        let activeBoardId = this.activeBoard._id
        this.$store.dispatch('editListName', { endpoint: `boards/${activeBoardId}/lists/`, list });
        this.editListForm = false
        event.target.reset()
      },
      createTask(listId) {
        //find board id
        let boardId = this.activeBoard._id
        let newTask = this.newTask
        //grab listName data from above data and input form to create list
        this.$store.dispatch('create', {
          endpoint: `boards/${boardId}/lists/${listId}/tasks`,
          //pointing to array of lists in store.state
          resource: 'tasks',
          data: newTask
        })
        event.target.reset()
      },
      logout() {
        this.$store.dispatch('logout')
      }


    },

  };

</script>

<style scoped>
  .card {
    width: 90%;
  }

  .pencil {
    float: right !important;
  }
</style>