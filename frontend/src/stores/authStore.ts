import { defineStore } from 'pinia';
import authServices from '../services/authServices';
import router from '../routes';
import userModel from '../models/userModel';
import loginModel from '../models/loginModel';
import authStateModel from '../models/authStateModel';
import donationRoleEnum from '../enums/donationRoleEnum';


export const useAuthStore = defineStore('authStore', {
  state: (): authStateModel => ({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    token: localStorage.getItem('token') || '',
    userRole: donationRoleEnum.donatee,
  
  }),
  actions: {
    async login(loginDetails: loginModel) {
      try {
        const response = await authServices.loginUser(loginDetails);
        if (response.data) {
          this.isAuthenticated = true;
          this.token = response.data.token;
          this.userRole = response.data.userRole;
          

          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('token', this.token);
          localStorage.setItem('userRole', this.userRole);
          
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    },
    async register(newUser: userModel) {
      try {
        const response = await authServices.registerUser(newUser);
        if (response.data) {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.token = '';
      this.userRole = donationRoleEnum.donatee;
    
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
   
      router.push('/login');
    }
  }
});