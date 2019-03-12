<template>

  <div class="lists-component">
    <div class="row my-5 justify-content-around">
      <div class="col-3 d-flex justify-content-center" v-for="list in lists" :key="list._id">
        <div class="card mb-3">
          <div class="card-title">
            <h4 class="card-title mt-3">{{list.listName}}</h4>

            <form v-show="editListForm == true" @submit.prevent="editListName, editListForm == false">
              <input class="" type="text" v-model="list.listName" placeholder=" Change Title">
              <button class="btn btn-sm btn-outline-info ml-2 mb-1" type="submit">Submit</button>
            </form>

            <span @click="deleteList(list._id)"> <i class="fas fa-trash-alt text-danger ml-3"></i></span>
            <span @click="editListForm = !editListForm"><i class="fas fa-pencil-alt text-warning ml-3"></i>
            </span>
            <hr>
            <div class="card-body">
              <!-- <tasks></tasks> -->
            </div>
          </div>
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
</style>