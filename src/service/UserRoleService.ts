import axios from 'axios';
import type { UserRole } from '../models/UserRole';

const API_URL = import.meta.env.VITE_API_URL + "/user-roles";

class UserRoleService {
    async getUserRoles() {
        const response = await axios.get<UserRole[]>(API_URL);
        return response;
    }

    async getUserRole(id: number) {
        const response = await axios.get<UserRole>(`${API_URL}/${id}`);
        return response;
    }

    async createUserRole(data: UserRole) {
        const response = await axios.post<UserRole>(API_URL, data);
        return response;
    }

    async updateUserRole(id: number, data: UserRole) {
        const response = await axios.put<UserRole>(`${API_URL}/${id}`, data);
        return response;
    }

    async deleteUserRole(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new UserRoleService();
