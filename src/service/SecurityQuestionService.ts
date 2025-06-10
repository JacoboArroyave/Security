import axios from 'axios';
import type { SecurityQuestion } from '../models/SecurityQuestion';

const API_URL = import.meta.env.VITE_API_URL + "/api/security-questions"; //DEPRONTO CAMBIAR ENDOPOINT

class SecurityQuestionService {
    async getSecurityQuestions() {
        const response = await axios.get<SecurityQuestion[]>(API_URL);
        return response;
    }

    async getSecurityQuestion(id: number) {
        const response = await axios.get<SecurityQuestion>(`${API_URL}/${id}`);
        return response;
    }

    async createSecurityQuestion(question: SecurityQuestion) {
        const response = await axios.post<SecurityQuestion>(API_URL, question);
        return response;
    }

    async updateSecurityQuestion(id: number, question: SecurityQuestion) {
        const response = await axios.put<SecurityQuestion>(`${API_URL}/${id}`, question);
        return response;
    }

    async deleteSecurityQuestion(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new SecurityQuestionService();
