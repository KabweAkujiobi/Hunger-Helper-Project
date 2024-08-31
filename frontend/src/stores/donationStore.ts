import { defineStore } from "pinia";
import donationServices from "../services/donationServices";
import donationModel from "../models/donationModel";

export const useDonationStore = defineStore('donationStore', {
    state: () => ({
        donations: [] as donationModel[],
        donation: null as donationModel | null,
        loading: false,
        error: null as string | null,
    }),
    actions:{
        async fetchDonations() {
            this.loading = true;
            this.error = null;
            try {
              const response = await donationServices.getDonations();
              this.donations = response.data; // Assumes response.data is an array of donationModel
            } catch (error) {
              console.error('Error fetching donations:', error);
              this.error = 'Failed to fetch donations';
            } finally {
              this.loading = false;
            }
        },
      
          async fetchDonationById(id: number) {
            this.loading = true;
            this.error = null;
            try {
              const response = await donationServices.getDonationsById(id);
              this.donation = response.data; // Assumes response.data is a single donationModel
            } catch (error) {
              console.error('Error fetching donation by ID:', error);
              this.error = 'Failed to fetch donation';
            } finally {
              this.loading = false;
            }
          },

          async createDonation(donationData: donationModel) {
            this.loading = true;
            this.error = null;
            try {
              const response = await donationServices.createDonation(donationData);
              this.donations.push(response.data); // Add new donation to the list
            } catch (error) {
              console.error('Error creating donation:', error);
              this.error = 'Failed to create donation';
            } finally {
              this.loading = false;
            }
          },
      
          async updateDonation(id: number, donationData: donationModel) {
            this.loading = true;
            this.error = null;
            try {
              const response = await donationServices.updateDonation(id, donationData);
              const index = this.donations.findIndex(donation => donation.id === id);
              if (index !== -1) {
                this.donations[index] = response.data;
              }
            } catch (error) {
              console.error('Error updating donation:', error);
              this.error = 'Failed to update donation';
            } finally {
              this.loading = false;
            }
          },
      
          async deleteDonation(id: number) {
            this.loading = true;
            this.error = null;
            try {
              await donationServices.deleteDonation(id);
              this.donations = this.donations.filter(donation => donation.id !== id);
            } catch (error) {
              console.error('Error deleting donation:', error);
              this.error = 'Failed to delete donation';
            } finally {
              this.loading = false;
            }
          }
    }

});