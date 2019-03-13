<template>
  <div class="lists-component">
    <div class="row my-5">
      <div class="col-3 d-flex justify-content-center" v-for="list in lists" :key="list._id">
        <div class="card shadow mb-3">
          <div class="card-body d-flex justify-content-center">
            <h4 class="card-title mt-2 tex-center">{{list.listName}} <i @click="editListForm = !editListForm"
                class="fas fa-pencil-alt text-warning ml-5"></i> </h4>

            <form v-if="editListForm == true" @submit.prevent="editListName, editListForm == false">
              <input class="" type="text" v-model="list.listName" placeholder=" Change Title">
              <button class="btn btn-sm btn-outline-info ml-2 mb-1" type="submit">Submit</button>
            </form>



          </div>
          <hr>
          <div class="card-body">
            <!-- <tasks></tasks> -->
          </div>
          <i @click="deleteList(list._id)"
            class="fas fa-trash-alt text-danger mr-2 mb-2 d-flex justify-content-end"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "listsComponent",
    editListForm: false,
    data() {
      return {
        listName: ""

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
      editListForm() {
        // let id = this.$store.state.lists.find(l => l._id == this.list._id);
        debugger
        this.$store.dispatch('editListName', this.list);
        event.target.reset()
      }


    },

  };

</script>

<style scoped>
  .card {
    width: 90%;
  }

  .pencil,
  .trash {
    float: right !important;
  }
</style>