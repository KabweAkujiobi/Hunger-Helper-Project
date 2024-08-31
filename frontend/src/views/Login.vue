<template>
    <v-container>
    <v-form @submit.prevent="login">
      <v-text-field v-model="userloginCredentials.email" label="Email" required></v-text-field>
      <v-text-field v-model="userloginCredentials.password" type="password" label="Password" required></v-text-field>
      <v-btn type="submit" color="primary">Login</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import loginModel from "../models/loginModel";
import { useAuthStore } from "../stores/authStore";

export default defineComponent({
    name: "Login",
    data(){
        return{
            userloginCredentials: ref<loginModel>({
                email: "",
                password:""
            }),
        };
    },
    setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  methods: {
    async login() {
        const credentials = {... this.userloginCredentials};
        this.authStore.login(credentials);

        // Save the token to localStorage(optional)
        localStorage.setItem('token', Response.data.token);
        localStorage.setItem();
    }
  }
});
</script>