<template>
  <v-container class="d-flex pa-50">
    <img :width="80" aspect-ratio="16/9" src="../assets/zerohungerlogo.png" />
    <h2 class="text-h4 align-self-center">Zero Hunger</h2>
  </v-container>
  <v-card class="d-flex mx-auto">
    <v-card-item class="w-50">
      <img src="../assets/loginPic.png" />
      <v-card-text class="text-wrap">Goal 2 is about creating a world free of hunger by 2030.The global issue of
        hungerand food insecurity has shown an alarmingincrease since 2015, a trend exacerbated by acombination of
        factors including thepandemic, conflict, climate change, anddeepening inequalities.</v-card-text>
    </v-card-item>
    <v-form class="w-50 my-auto mx-10" @submit.prevent="login">
      <v-text-field v-model="userloginCredentials.email" label="Email" variant="outlined" required></v-text-field>
      <v-text-field v-model="userloginCredentials.password" type="password" label="Password" variant="outlined"
        required></v-text-field>
      <v-btn type="submit" color="#dc9333">Login</v-btn>
      <p class="pa-5">If you don't have an account <router-link to="/register">Register</router-link></p>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import loginModel from "../models/loginModel";
import { useAuthStore } from "../stores/authStore";

export default defineComponent({
  name: "Login",
  data() {
    return {
      userloginCredentials: ref<loginModel>({
        email: "",
        password: ""
      }),
    };
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  methods: {
    async login() {
      const credentials = { ... this.userloginCredentials };
      this.authStore.login(credentials);
    }
  }
});
</script>

<style>
h2 {
  color: #dc9333;
}
</style>