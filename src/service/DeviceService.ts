import axios from 'axios';
import type { Device } from '../models/Device';

const API_URL = import.meta.env.VITE_API_URL + "/devices"; // DEPRONTO CAMBIAR ENDOPOINT

class DeviceService {
    async getDevices() {
        const response = await axios.get<Device[]>(API_URL);
        return response;
    }

    async getDevice(id: number) {
        const response = await axios.get<Device>(`${API_URL}/${id}`);
        return response;
    }

    async createDevice(device: Device) {
        const response = await axios.post<Device>(API_URL, device);
        return response;
    }

    async updateDevice(id: number, device: Device) {
        const response = await axios.put<Device>(`${API_URL}/${id}`, device);
        return response;
    }

    async deleteDevice(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new DeviceService();
