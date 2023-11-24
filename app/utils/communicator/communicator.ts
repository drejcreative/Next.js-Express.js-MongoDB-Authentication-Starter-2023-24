import axios from "axios";
import { preparePayload } from "./fetcher";

export class communicator {
  static async get(url: string, token: any) {
    try {
      const response = await axios.get(url, preparePayload(token));
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }

  static async post(url: string, data: any, token?: any) {
    try {
      const response = await axios.post(url, data, preparePayload(token));
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }

  static async put(url: string, data: any, token?: any) {
    try {
      const response = await axios.put(url, data, preparePayload(token));
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }

  static async delete(url: string, token?: any) {
    try {
      const response = await axios.delete(url, preparePayload(token));
      return response.data;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  }
}
