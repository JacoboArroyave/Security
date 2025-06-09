import axios from 'axios';
import type { Password } from '../models/Password';

const API_URL = import.meta.env.VITE_API_URL + "/passwords"; // DEPRONTO CAMBIAR ENDOPOINT

class PasswordService {
    async getPasswords() {
        const response = await axios.get<Password[]>(API_URL);
        return response;
    }

    async getPassword(id: number) {
        const response = await axios.get<Password>(`${API_URL}/${id}`);
        return response;
    }

    async createPassword(data: Password) {
        const response = await axios.post<Password>(API_URL, data);
        return response;
    }

    async updatePassword(id: number, data: Password) {
        const response = await axios.put<Password>(`${API_URL}/${id}`, data);
        return response;
    }

    async deletePassword(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new PasswordService();
