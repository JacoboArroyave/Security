import axios from "axios";
import type { Profile } from "../models/Profile";

const API_URL = import.meta.env.VITE_API_URL + "/api"; // DEPRONTO CAMBIAR ENDOPOINT

class ProfileService {
  async createProfile(userId: string, formData: FormData) {
    const url = `${API_URL}/profiles/user/${userId}`;
    console.log('[ProfileService.createProfile] URL:', url);
    return await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async getProfiles() {
    return await axios.get(`${API_URL}/profiles`);
  }

  async deleteProfile(id: number) {
    return await axios.delete(`${API_URL}/profiles/${id}`);
  }

  async getProfile(id: number) {
  const url = `${API_URL}/profiles/${id}`;
  console.log('[getProfile] URL solicitada:', url); // 👈 LOG aquí
  const response = await axios.get<Profile>(url);
  return response;
}

  async updateProfile(id: number, data: Profile) {
    const response = await axios.put<Profile>(`${API_URL}/${id}`, data);
    return response;
  }
}

export default new ProfileService();
