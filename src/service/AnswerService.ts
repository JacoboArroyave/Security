import axios from 'axios';
import type { Answer } from '../models/Answer';

const API_URL = import.meta.env.VITE_API_URL + "/api/answers"; //DEPRONTO CAMBIAR ENDOPOINT

class AnswerService {
    async getAnswers() {
        const response = await axios.get<Answer[]>(API_URL);
        return response;
    }

    async getAnswer(id: number) {
        const response = await axios.get<Answer>(`${API_URL}/${id}`);
        return response;
    }

    async createAnswer(user_id:string,question_id:string, answer: Answer) {
        const response = await axios.post<Answer>(`${API_URL}/user/${user_id}/question/${question_id}`, answer);
        return response;
    }

    async updateAnswer( answer: Answer,id:any) {
        console.log(answer);

        const response = await axios.put<Answer>(`${API_URL}/${id}`, answer);
        return response;
    }

    async deleteAnswer(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new AnswerService();
