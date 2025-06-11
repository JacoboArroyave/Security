import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + "/api/digital-signatures"; //DEPRONTO CAMBIAR ENDOPOINT

const DigitalSignatureService = {
  async createDigitalSignature(formData: FormData, userId: number) {
    console.log(formData);
    
    return await axios.post(`${API_URL}/user/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async getAllDigitalSignatures() {
    return await axios.get(API_URL);
  },

  async getDigitalSignatureById(id: number) {
    return await axios.get(`${API_URL}/${id}`);
  },

  async getDigitalSignatureByUserId(userId: number) {
    return await axios.get(`${API_URL}/user/${userId}`);
  },

  async getSignaturesByUserId(userId: string) {
    // Ajusta el endpoint según tu backend
    return await axios.get(`${API_URL}/user/${userId}`);
  },

  async updateDigitalSignature(id: number, formData: FormData) {
    return await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async deleteDigitalSignature(id: number) {
    return await axios.delete(`${API_URL}/${id}`);
  },
};

export default DigitalSignatureService;