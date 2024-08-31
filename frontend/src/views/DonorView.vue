<template>
    <div class="donor-view">
      <h1>Donor Dashboard</h1>
      
      <!-- Form to create a new donation -->
      <form @submit.prevent="createDonation">
        <h2>Create Donation</h2>
        <input v-model="newDonation.title" placeholder="Title" />
        <input v-model="newDonation.description" placeholder="Description" />
        <input v-model="newDonation.foodType" placeholder="Food Type" />
        <input v-model="newDonation.quantity" type="number" placeholder="Quantity" />
        <input v-model="newDonation.location" placeholder="Location" />
        <button type="submit">Create Donation</button>
      </form>
      
      <!-- List of donations created by the donor -->
      <h2>My Donations</h2>
      <ul>
        <li v-for="donation in donations" :key="donation.id">
          <p>{{ donation.title }} - {{ donation.foodType }}</p>
          <p>{{ donation.description }}</p>
          <p>{{ donation.quantity }} items available</p>
          <button @click="editDonation(donation.id)">Edit</button>
          <button @click="deleteDonation(donation.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDonationStore } from '../stores/donationStore';
import donationModel from '../models/donationModel';

export default defineComponent({
  data() {
    return {
      newDonation: {
        title: '',
        description: '',
        foodType: '',
        quantity: 0,
        location: '',
        donorId: 1 // This should be set to the logged-in donor's ID
      },
      donations: [] as donationModel[],
    };
  },
  created() {
    this.fetchDonations();
  },
  methods: {
    async fetchDonations() {
      const donationStore = useDonationStore();
      await donationStore.fetchDonations();
      this.donations = donationStore.donations;
    },
    async createDonation() {
      const donationStore = useDonationStore();
      await donationStore.createDonation(this.newDonation);
      this.resetNewDonation();
      this.donations = donationStore.donations;
    },
    resetNewDonation() {
      this.newDonation = {
        title: '',
        description: '',
        foodType: '',
        quantity: 0,
        location: '',
        donorId: 1
      };
    },
    async deleteDonation(id: number) {
      const donationStore = useDonationStore();
      await donationStore.deleteDonation(id);
      this.donations = donationStore.donations;
    },
    async editDonation(id: number) {
      // Implement the logic to populate the form with the donation data and allow updates
    }
  }
});
</script>