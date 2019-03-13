<template>
  <div class="tasks-component">
    <div class="row my-2">
      <div class="col-12 d-flex justify-content-center" v-for="task in tasks" :key="task._id">
        <div class="card shadow mb-3">
          <div class="card-body d-flex justify-content-center">
            <h4 v-if="editListForm == false" class="card-title mt-2 tex-center">{{list.listName}}</h4>
          </div>
          <hr>
          <div class="card-body">
            <!-- <tasks></tasks> -->
          </div>
          <i
            @click="deleteList(list._id)"
            class="fas fa-trash-alt text-danger mr-2 mb-2 d-flex justify-content-end"
          ></i>
        </div>
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
  computed: {},
  methods: {},
  components: {}
};
</script>