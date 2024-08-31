import axiosInstance from "../api/axiosInstance";
import donationModel from "../models/donationModel";

class donationServices {
    async createDonation( data: donationModel){
        return await axiosInstance.post<donationModel>("/donations", data);
    }

    async getDonations(){
        return await axiosInstance.get("/donations");
    }

    async getDonationsById(id: number){
        return await axiosInstance.get<donationModel>(`/donations/${id}`);
    }

    async updateDonation(id: number, data: donationModel){
        return await axiosInstance.put<donationModel>(`/donations/${id}`, data);
    }

    async deleteDonation(id: number){
        return await axiosInstance.delete<donationModel>(`/donations/${id}`);
    }
}

export default new donationServices();