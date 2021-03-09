import { Transaction } from "../api/jobcoinApi";

export interface TransactionsAsChartData {
  timestamp: string;
  balance: string;
  from?: string;
  to: string;
  amount: string;
}

function decorateTransactionsForRecharts(
  transactions: Transaction[],
  address: string
): TransactionsAsChartData[] {
  let balance = 0;
  const data = transactions.map((val) => {
    const amount = Number(val.amount);

    if (val.fromAddress === address) {
      balance = balance - amount;
    } else if (address === val.toAddress) {
      balance = balance + amount;
    }
    return {
      timestamp: new Date(val.timestamp).toLocaleString(),
      balance: balance.toString(),
      from: val.fromAddress,
      to: val.toAddress,
      amount: val.amount,
    };
  });
  return data;
}

export default decorateTransactionsForRecharts;
