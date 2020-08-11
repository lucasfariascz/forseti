import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

const transactions: Transaction[] = [];

class TransactionsRepository {
  // constructor() {
  //   this.transactions = [];
  // }

  public async all(): Promise<Transaction[]> {
    return transactions;
  }

  public async getBalance(): Promise<Balance> {
    const outcome = transactions.reduce((a, v) => {
      return a + (v.type === 'outcome' ? v.value : 0);
    }, 0);
    const income = transactions.reduce((a, v) => {
      return a + (v.type === 'income' ? v.value : 0);
    }, 0);
    const total = income - outcome;
    return {
      income,
      outcome,
      total,
    };
  }

  public async create(transaction: Transaction): Promise<Transaction> {
    transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
