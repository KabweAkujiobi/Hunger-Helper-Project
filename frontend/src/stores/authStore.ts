import { defineStore } from 'pinia';
import authServices from '../services/authServices';
import router from '../routes';
import userModel from '../models/userModel';
import loginModel from '../models/loginModel';
import authStateModel from '../models/authStateModel';


export const useAuthStore = defineStore('authStore', {
  state: (): authStateModel => ({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  }),
  actions: {
    async login(loginDetails: loginModel) {
      try {
        const response = await authServices.loginUser(loginDetails);
        if (response.data) {
          this.isAuthenticated = true;
          localStorage.setItem('isAuthenticated', 'true');
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
          this.isAuthenticated = true;
          localStorage.setItem('isAuthenticated', 'true');
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    },
    logout() {
      this.isAuthenticated = false;
      localStorage.removeItem('isAuthenticated');
      router.push('/login');
    }
  }
});