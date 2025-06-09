import axios from 'axios';
import type { Address } from '../models/Address';

const API_URL = import.meta.env.VITE_API_URL + '/api/addresses';

class AddressService {
    async getAddresses() {
        const response = await axios.get<Address[]>(API_URL);
        return response;
    }

    async getAddress(id: number) {
        const response = await axios.get<Address>(`${API_URL}/${id}`);
        return response;
    }

    async createAddress(userId: string, address: Address) {
        console.log("Creating address for user:", userId, "with data:", address,`${API_URL}/user/${userId}`, address);
        // Ensure the userId is included in the address object if required by your API
        
        const response = await axios.post<Address>(`${API_URL}/user/${userId}`, address);
        return response;
    }

    async updateAddress(id: string, address: Address) {
        const response = await axios.put<Address>(`${API_URL}/${id}`, address);
        return response;
    }

    async deleteAddress(id: string) {
        await axios.delete(`${API_URL}/${id}`);
    }

    async getAddressesByUserId(userId: string) {
        const response = await axios.get<Address[]>(`${API_URL}/user/${userId}`);
        return response;
    }
}

export default new AddressService();
