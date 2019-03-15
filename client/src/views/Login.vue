<template>
  <div class="login container-fluid">
    <div class="row">
      <div class="col-12 d-flex justify-content-center title">
        <h1>Billboards</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <form v-if="loginForm" @submit.prevent="loginUser">
          <input class="ml-5 shadow" type="email" v-model="creds.email" placeholder="email">
          <input class="ml-2 shadow" type="password" v-model="creds.password" placeholder="password">
          <button class="btn btn-sm btn-outline-light shadow ml-2 mb-1" type="submit">Login</button>
        </form>
        <form v-else @submit.prevent="register">
          <input type="text" v-model="newUser.name" placeholder="name">
          <input class="ml-2" type="email" v-model="newUser.email" placeholder="email">
          <input class="ml-2" type="password" v-model="newUser.password" placeholder="password">
          <button class="btn btn-sm btn-outline-light ml-2" type="submit">Create Account</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="action col-12 d-flex justify-content-center" @click="loginForm = !loginForm">
        <p class="mt-4 text-white" v-if="loginForm">No account? Click here to Register</p>
        <p class="text-white mt-4" v-else>Already have an account? Click here to Login</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import router from '@/router.js'
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    }
  };
</script>

<style scoped>
  .title {
    margin-top: 17vh;
    color: white;
    font-weight: 600;
  }

  .action {
    cursor: pointer;
  }

  form {
    margin-top: 0vh;
  }

  .login {
    background: url('../../public/img/ny.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 100vh;
  }
</style>