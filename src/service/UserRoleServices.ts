import axios from 'axios';
import type { UserRole } from '../models/UserRole';

const API_URL = import.meta.env.VITE_API_URL + '/api/user-roles';

class UserRoleService {
    async getUserRoles() {
        const response = await axios.get<UserRole[]>(API_URL);
        return response;
    }

    async getUserRole(id: string) {
        const response = await axios.get<UserRole>(`${API_URL}/${id}`);
        return response;
    }

    async createUserRole(userId: string, roleId: string, userRole: any) {
        console.log("Creating user role for user:", userId, "with role:", roleId, "and data:", userRole);
        
        const response = await axios.post<UserRole>(`${API_URL}/user/${userId}/role/${roleId}`, userRole);
        return response;
    }

    async updateUserRole(id: string, userRole: any) {
        console.log("Updating user role with ID:", id, "and data:", userRole);
        
        const response = await axios.put<UserRole>(`${API_URL}/${id}`, userRole);
        return response;
    }

    async deleteUserRole(id: string) {
        await axios.delete(`${API_URL}/${id}`);
    }

    async getUsersByRole(roleId: string) {
        const response = await axios.get<UserRole[]>(`${API_URL}/role/${roleId}`);
        return response;
    }

    async getRolesByUser(userId: string) {
        const response = await axios.get<UserRole[]>(`${API_URL}/user/${userId}`);
        return response;
    }
}

export default new UserRoleService();
