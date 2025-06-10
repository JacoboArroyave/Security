import axios from 'axios';
import type { Password } from '../models/Password';

const API_URL = import.meta.env.VITE_API_URL + 'passwords';

class PasswordService {
    async getPasswords() {
        const response = await axios.get<Password[]>(API_URL);
        return response;
    }

    async getPassword(id: string) {
        const response = await axios.get<Password>(`${API_URL}/${id}`);
        return response;
    }

    async createPassword(userId: string, password: Password) {
        const response = await axios.post<Password>(`${API_URL}/user/${userId}`, password);
        return response;
    }

    async updatePassword(id: string, password: Password) {
        const response = await axios.put<Password>(`${API_URL}/${id}`, password);
        return response;
    }

    async deletePassword(id: string) {
        await axios.delete(`${API_URL}/${id}`);
    }

    async getPasswordsByUserId(userId: string) {
        const response = await axios.get<Password[]>(`${API_URL}/user/${userId}`);
        return response;
    }
}

export default new PasswordService();
