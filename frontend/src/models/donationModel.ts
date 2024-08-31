export default interface donationModel{
    id?: number;
    title: string;
    description: string;
    foodType: string;
    quantity: number;
    donorId?: number;
    location: string;
}