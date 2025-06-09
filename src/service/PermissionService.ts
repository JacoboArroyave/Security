import axios from 'axios';
import type { Permission } from '../models/Permission';

const API_URL = import.meta.env.VITE_API_URL + "/permissions";// DEPRONTO CAMBIAR ENDOPOINT

class PermissionService {
    async getPermissions() {
        const response = await axios.get<Permission[]>(API_URL);
        return response;
    }

    async getPermission(id: number) {
        const response = await axios.get<Permission>(`${API_URL}/${id}`);
        return response;
    }

    async createPermission(data: Permission) {
        const response = await axios.post<Permission>(API_URL, data);
        return response;
    }

    async updatePermission(id: number, data: Permission) {
        const response = await axios.put<Permission>(`${API_URL}/${id}`, data);
        return response;
    }

    async deletePermission(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new PermissionService();
