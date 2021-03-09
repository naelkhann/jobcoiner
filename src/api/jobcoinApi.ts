import axios, { AxiosInstance } from "axios";

interface SendJobcoinParams {
  fromAddress: string;
  toAddress: string;
  amount: string;
}

export interface AddressData {
  balance: string;
  transactions: Transaction[];
}

interface Transaction {
  timestamp: string;
  fromAddress?: string;
  toAddress: string;
  amount: string;
}

const api: AxiosInstance = axios.create({
  baseURL: "https://jobcoin.gemini.com/celery-attire/api/",
  timeout: 3000,
});

export const getAddressInfo = (address: string) =>
  api.get(`addresses/${address}`);

export const getAllTransactions = () => api.get("transactions");

export const sendJobcoin = (params: SendJobcoinParams) => {
  api.post("transactions", params);
};
