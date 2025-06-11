import axios from 'axios';
import type { User } from '../models/User';

const API_URL = import.meta.env.VITE_API_URL + "/api/users/"; 

class UserService {
    async getUsers() {
        
        const response = await axios.get<User[]>(API_URL);
        return response;
    }

    async getUser(id: number) {
        const response = await axios.get<User>(`${API_URL}/${id}`);
        return response;
    }

    async createUser(data: User) {
        const response = await axios.post<User>(API_URL, data);
        return response;
    }

    async updateUser(id: number, data: User) {
        const response = await axios.put<User>(`${API_URL}/${id}`, data);
        return response;
    }

    async deleteUser(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new UserService();
