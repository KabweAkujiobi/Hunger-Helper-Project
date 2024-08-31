import axiosInstance from "../api/axiosInstance";
import userModel from "../models/userModel";
import loginModel from "../models/loginModel";

class authServices {
    async registerUser(data: userModel){
        return await axiosInstance.post<userModel>("/auth/register", data);
    }

    async loginUser(data: loginModel){
        return await axiosInstance.post("/auth/login", data);
    }
}

export default new authServices();