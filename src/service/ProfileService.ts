import axios from "axios";
import type { Profile } from "../models/Profile";

const API_URL = import.meta.env.VITE_API_URL + "/api/profiles"; // DEPRONTO CAMBIAR ENDOPOINT

class ProfileService {
  async createProfile(userId: string, formData: FormData) {
    return await axios.post(`${API_URL}/profiles/user/${userId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async getProfiles() {
    return await axios.get(`${API_URL}`);
  }

  async deleteProfile(id: string) {
    return await axios.delete(`${API_URL}/profiles/${id}`);
  }

  async getProfile(id: number) {
    const response = await axios.get<Profile>(`${API_URL}/${id}`);
    return response;
  }

  async updateProfile(id: number, data: Profile) {
    const response = await axios.put<Profile>(`${API_URL}/${id}`, data);
    return response;
  }

  async getProfilesByUserId(userId: string) {
    // Ajusta el endpoint según tu backend
    return await axios.get(`${API_URL}/user/${userId}`);
  }
}

export default new ProfileService();
