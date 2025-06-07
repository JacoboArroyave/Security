import axios from 'axios';
import type { DigitalSignature } from '../models/DigitalSignature';

const API_URL = import.meta.env.VITE_API_URL + "/digital-signatures"; //DEPRONTO CAMBIAR ENDOPOINT

class DigitalSignatureService {
    async getSignatures() {
        const response = await axios.get<DigitalSignature[]>(API_URL);
        return response;
    }

    async getSignature(id: number) {
        const response = await axios.get<DigitalSignature>(`${API_URL}/${id}`);
        return response;
    }

    async createSignature(signature: DigitalSignature) {
        const response = await axios.post<DigitalSignature>(API_URL, signature);
        return response;
    }

    async updateSignature(id: number, signature: DigitalSignature) {
        const response = await axios.put<DigitalSignature>(`${API_URL}/${id}`, signature);
        return response;
    }

    async deleteSignature(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new DigitalSignatureService();
