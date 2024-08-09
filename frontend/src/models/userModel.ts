import beneficiaryTypeEnum from "../enums/beneficiaryTypeEnum";
import organisationTypeEnum from "../enums/organisationTypeEnum";
import donationRoleEnum from "../enums/donationRoleEnum";

export default interface userModel {
    beneficiaryType: beneficiaryTypeEnum;
    organisationType?:  organisationTypeEnum;
    organisationName?: string;
    firstName: string;
    lastName: string;
    donationRole: donationRoleEnum;
    contactNumber: number;
    email: string;
    password: string;
}