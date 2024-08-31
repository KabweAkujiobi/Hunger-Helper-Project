import donationRoleEnum from "../enums/donationRoleEnum";


export default interface authStateModel{
    isAuthenticated: boolean;
    token: string;
    userRole: donationRoleEnum;
    
}