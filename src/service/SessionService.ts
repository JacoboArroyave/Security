import axios from 'axios';
import type { Session } from '../models/Session';

const API_URL = import.meta.env.VITE_API_URL + "/api/sessions";

class SessionService {
    async getSessions() {
        const response = await axios.get<Session[]>(API_URL);
        return response;
    }

    async getSession(id: string) {
        const response = await axios.get<Session>(`${API_URL}/${id}`);
        return response;
    }


    async createSession(user_id: string, session: Session) {
    const response = await axios.post<Session>(`${API_URL}/user/${user_id}`, session);
    return response;
  }


    async updateSession(id: number, data: Session) {
        const response = await axios.put<Session>(`${API_URL}/${id}`, data);
        return response;
    }

    async deleteSession(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }

    async getSessionsByUserId(userId: string) {
        // Ajusta el endpoint según tu backend
        return await axios.get(`${API_URL}/user/${userId}`);
    }
}

export default new SessionService();
