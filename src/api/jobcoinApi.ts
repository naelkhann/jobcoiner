import axios, { AxiosInstance } from "axios";

export interface AddressData {
  balance: string;
  transactions: Transaction[];
}

export interface Transaction {
  timestamp: string;
  fromAddress?: string;
  toAddress: string;
  amount: string;
}

export type TransactionParams = Omit<Transaction, "timestamp">;

const api: AxiosInstance = axios.create({
  baseURL: "https://jobcoin.gemini.com/celery-attire/api/",
  timeout: 3000,
});

export const getAddressInfo = (address: string) =>
  api.get(`addresses/${address}`);

export const getAllTransactions = () => api.get("transactions");

export const sendJobcoin = (params: TransactionParams) =>
  api.post("transactions", params);
