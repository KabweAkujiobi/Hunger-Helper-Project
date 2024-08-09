<template>
    <nav>
      <router-link to="/register">Register</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useAuthStore } from "../stores/authStore";
  
  export default defineComponent({
    data() {
      return {
        authStore: useAuthStore()
      };
    },
    computed: {
      isAuthenticated() {
        return this.authStore.isAuthenticated;
      }
    },
    methods: {
      logout() {
        this.authStore.logout();
      }
    }
  });
  </script>