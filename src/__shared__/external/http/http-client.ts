import axios, { AxiosInstance } from 'axios';
import { injectable } from 'inversify';

@injectable()
export class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
    });
  }

  async get<T>(url: string) {
    return await this.client.get<T>(url);
  }
}
