<template>

  <div class="lists-component">
    <div class="row my-5 justify-content-around">
      <div class="col-3 d-flex justify-content-center" v-for="list in lists" :key="list._id">
        <div class="card mb-3">
          <div class="card-title">
            <h4 class="card-title">{{list.listName}}</h4>
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
    computed: {
      lists() {
        return this.$store.state.lists;
      }
    },

  };

</script>

<style scoped>
  .card {
    width: 90%;
  }
</style>