<template>
    <v-container class="d-flex pa-50">
      <img :width="80" aspect-ratio="16/9" src="../assets/zerohungerlogo.png"/>
      <h2 class="text-h4 align-self-center">Zero Hunger</h2>
    </v-container>
    <v-card class="d-flex mx-auto">
      <v-card-item class="w-50">
        <img src="../assets/hungry_kids.png"/>
      </v-card-item>
        <v-form @submit.prevent="register"  class="w-50 my-auto mx-10">
          <v-window v-model="step">
            <v-window-item :value="1">

          <h2 class="text-h4 align-self-center">Registration</h2>
         
      <v-select
        v-model="user.beneficiaryType"
        variant="outlined"
        label="Beneficiary Type"
        :items="beneficiaryTypes"
        item-title="text"
        item-value="value"
        required
      ></v-select>
      <v-text-field v-model="user.organisationName" label="Organisation Name" variant="outlined"></v-text-field>
      <v-select
        v-model="user.organisationType"
        variant="outlined"
        label="Organisation Type"
        :items="organisationTypes"
        item-title="text"
        item-value="value"
        required
      ></v-select>
      <v-text-field v-model="user.firstName" label="First Name" variant="outlined" required></v-text-field>
      <v-text-field v-model="user.lastName" label="Last Name" variant="outlined" required></v-text-field>
    </v-window-item>

    <v-window-item :value="2">
      <v-select
        v-model="user.donationRole"
        variant="outlined"
        label="Donation Role"
        :items="donationRoles"
        item-title="text"
        item-value="value"
        required
      ></v-select>
      <v-text-field v-model.number="user.contactNumber" label="Contact Number" variant="outlined" required></v-text-field>
      <v-text-field v-model="user.email" label="Email" variant="outlined" required></v-text-field>
      <v-text-field v-model="user.password" type="string" label="Password" variant="outlined" required></v-text-field>
    
      <v-btn type="submit" color="primary">Register</v-btn>
    </v-window-item>
    </v-window>
    <v-card-actions>
      <v-btn
        v-if="step > 1"
        variant="text"
        @click="step--"
      >
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        v-if="step <= 3"
        color="primary"
        variant="flat"
        @click="step++"
      >
        Next
      </v-btn>
    </v-card-actions>
    </v-form>
   
    </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import authServices from "../services/authServices";
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