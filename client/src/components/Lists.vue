<template>
  <div class="lists-component">
    <div class="row my-5">
      <div class="col-3 d-flex justify-content-center" v-for="list in lists" :key="list._id">
        <div class="card shadow mb-3">
          <div class="card-body d-flex justify-content-center">
            <h4 v-if="editListForm == false" class="card-title mt-2 tex-center">{{list.listName}} <i
                @click="editListForm = true" class="fas fa-pencil-alt text-warning ml-5"></i> </h4>
            <form v-else="editListForm == true" @submit.prevent="editListName(list)">
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
    data() {
      return {
        editListForm: false,
        listName: ''
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