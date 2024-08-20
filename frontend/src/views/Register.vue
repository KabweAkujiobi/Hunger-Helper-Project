<template>
    <v-container>
        <h1>Register</h1>

        <v-form @submit.prevent="register">
      <v-select
        v-model="user.beneficiaryType"
        label="Beneficiary Type"
        :items="beneficiaryTypes"
        item-title="text"
        item-value="value"
        required
      ></v-select>
      <v-text-field v-model="user.organisationName" label="Organisation Name"></v-text-field>
      <v-select
        v-model="user.organisationType"
        label="Organisation Type"
        :items="organisationTypes"
        item-title="text"
        item-value="value"
        required
      ></v-select>
      <v-text-field v-model="user.firstName" label="First Name" required></v-text-field>
      <v-text-field v-model="user.lastName" label="Last Name" required></v-text-field>
      <v-select
        v-model="user.donationRole"
        label="Donation Role"
        :items="donationRoles"
        item-title="text"
        item-value="value"
        required
      ></v-select>
      <v-text-field v-model.number="user.contactNumber" label="Contact Number" required></v-text-field>
      <v-text-field v-model="user.email" label="Email" required></v-text-field>
      <v-text-field v-model="user.password" type="string" label="Password" required></v-text-field>
      <v-btn type="submit" color="primary">Register</v-btn>
    </v-form>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import userModel  from "../models/userModel";
import beneficiaryTypeEnum from "../enums/beneficiaryTypeEnum";
import donationRoleEnum from "../enums/donationRoleEnum";
import organisationTypeEnum from "../enums/organisationTypeEnum";
import { useAuthStore } from "../stores/authStore";

export default defineComponent({
    name: "Register",
    data(){
        return {
            user: ref<userModel>({
                beneficiaryType: beneficiaryTypeEnum.individual,
                organisationName: "",
                organisationType: organisationTypeEnum.charity,
                firstName: "",
                lastName: "",
                donationRole: donationRoleEnum.donatee,
                contactNumber: 0,
                email: "",
                password: ""
            }),
            beneficiaryTypes: this.getBeneficiaryTypes(),
            organisationTypes: this.getOrganisationTypes(),
            donationRoles: this.getDonationRoles(),
        };
    },
    setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
    methods: {
        async register() {
            const newUser = { ...this.user };
            //const response = await authServices.registerUser(newUser);
            this.authStore.register(newUser);
        },
        getBeneficiaryTypes(){
            return Object.keys(beneficiaryTypeEnum)
            .filter((key) => isNaN(Number(key)))
            .map((key) => ({
              text: key,
              value: beneficiaryTypeEnum[key as keyof typeof beneficiaryTypeEnum],
            }));
        },
        getOrganisationTypes(){
            return Object.keys(organisationTypeEnum)
            .filter((key) => isNaN(Number(key)))
            .map((key) => ({
              text: key,
              value: organisationTypeEnum[key as keyof typeof organisationTypeEnum],
            }));
        },
        getDonationRoles(){
            return Object.keys(donationRoleEnum)
            .filter((key) => isNaN(Number(key)))
            .map((key) => ({
              text: key,
              value: donationRoleEnum[key as keyof typeof donationRoleEnum],
            }));
        },
    }
});
</script>