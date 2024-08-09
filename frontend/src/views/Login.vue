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
import authServices from "../services/authServices";
import { useRouter } from "vue-router";
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
        //const response = await authServices.loginUser(credentials);
        //console.log('User logged in:', response.data);

        //Todo possibility
        // Save the token to localStorage(optional)
        // localStorage.setItem('token', response.data.token);
    }
  }
});
</script>