import axios from 'axios';

export class authCommunicator {
  static async get(url, payload) {
    try {
      const response = await axios.get(url, { ...payload });
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }

  static async post(url, data, payload) {
    try {
      const response = await axios.post(url, data, { ...payload });
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }

  static async put(url, data, payload) {
    try {
      const response = await axios.put(url, data, { ...payload });
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }

  static async delete(url, data, payload) {
    try {
      const response = await axios.delete(url, data, { ...payload });
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }
}