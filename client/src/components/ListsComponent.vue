<template>
  <div class="col-3 d-flex justify-content-center">
    <drop @drop="changeTaskList" class="card shadow mb-3">
      <div>
        <div class="card-body d-flex justify-content-center">
          <h4 v-if="editListForm == false" class="col-12 card-title mt-2 d-flex justify-content-center mb-0">
            {{list.listName}}
          </h4>
          <!-- edit list name commented out for now
            <form v-else="editListForm == true" @submit.prevent="editListName(list)">
              <input class="" type="text" v-model="list.listName" placeholder=" Change Title">
              <button class="btn btn-sm btn-outline-info ml-2 mb-1" type="submit">Submit</button>
            </form>-->
        </div>
        <div class="row">
          <div class="col-12 create-task d-flex justify-content-center">
            <button v-if="!taskForm" @click="taskForm = !taskForm" class="btn btn-sm btn-outline-success shadow">Create
              Task</button>
            <form v-if="taskForm" @submit.prevent="createTask(list._id)">
              <input class="task-input ml-2" type="text" v-model="newTask.title" placeholder=" Task Title">
              <input class="task-input ml-2 mt-2" type="text" v-model="newTask.image"
                placeholder=" Task Image URL"><br />
              <button class="btn btn-sm btn-outline-info ml-2 mt-2 shadow" type="submit">Submit</button>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="col-12 create-task d-flex justify-content-center">
            <button v-if="taskForm" @click="taskForm = !taskForm"
              class="btn btn-sm btn-outline-dark shadow text-center mt-2">Hide
              Form</button>
          </div>
        </div>
      </div>

      <div class="card-text">
        <div class="row my-5">

          <tasks-component v-for="task in tasks" :task="task"></tasks-component>

        </div>
        <i @click="deleteList(list._id)" class="delete-list fas fa-trash-alt text-danger mr-2 mb-2"></i>
      </div>
    </drop>
  </div>
</template>

<script>
  import TasksComponent from "@/components/TasksComponent.vue";

  export default {
    name: "listsComponent",
    mounted() {

    },
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
      },
      tasks() {
        return this.$store.state.tasks[this.list._id];
      },
    },
    props: ["list", "task"],
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
        this.taskForm = false
        event.target.reset()
      },
      logout() {
        this.$store.dispatch('logout')
      },
      changeTaskList(task) {
        let boardId = this.activeBoard._id
        let change = {
          list: this.list,
          oldTask: task,
          task: {
            listId: this.list._id
          }
        };
        this.$store.dispatch("changeTaskList", {
          endpoint: `boards/${boardId}/lists/`,
          oldPayload: {
            endpoint: `boards/${boardId}/lists/${change.oldTask.listId}/tasks`
          },
          newPayload: {
            endpoint: `boards/${boardId}/lists/${change.task.listId}/tasks`
          },
          data: change
        });
      }

    },
    components: {
      TasksComponent
    }
  };

</script>

<style scoped>
  .card {
    width: 100%;
    background-color: rgb(209, 207, 207);
  }

  .pencil {
    float: right !important;
  }

  .task-input {
    width: 95%;
  }

  .delete-list {
    position: absolute;
    bottom: 0.5rem;
    margin-left: 93%;
  }
</style>