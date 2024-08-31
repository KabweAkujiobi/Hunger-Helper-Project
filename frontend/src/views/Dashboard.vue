<template>
    <div>
      <!-- Render the appropriate dashboard view based on the user's role -->
      <component v-if="isAuthenticated" :is="viewComponent" />
      
      <!-- Show unauthorized access message if the user is not authenticated -->
      <div v-else>
        <h1>Please log in to access the dashboard</h1>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useAuthStore } from '../stores/authStore';
  import DonateeView from './DonateeView.vue';
  import DonorView from './DonorView.vue';
  
  const authStore = useAuthStore();
  
  const isAuthenticated = computed(() => authStore.isAuthenticated);
  
  const viewComponent = computed(() => {
    if (authStore.userRole === 'donor') {
      return DonorView;
    } else if (authStore.userRole === 'donatee') {
      return DonateeView;
    }
    return null;
  });
  </script>