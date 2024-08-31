<template>
    <div class="donatee-view">
      <h1>Donatee Dashboard</h1>
      
      <h2>Available Donations</h2>
      <ul>
        <li v-for="donation in donations" :key="donation.id">
          <p>{{ donation.title }} - {{ donation.foodType }}</p>
          <p>{{ donation.description }}</p>
          <p>{{ donation.quantity }} items available</p>
          <p>Location: {{ donation.location }}</p>
          <button @click="contactDonor(donation.donorId)">Contact Donor</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useDonationStore } from '../stores/donationStore';
  import donationModel from '../models/donationModel';
  
  const donationStore = useDonationStore();
  const donations = ref<donationModel[]>([]);
  
  onMounted(async () => {
    await donationStore.fetchDonations();
    donations.value = donationStore.donations;
  });
  
  const contactDonor = (donorId: number) => {
    // Implement logic to contact donor, possibly opening a chat window
  };
  </script>