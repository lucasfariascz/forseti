import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  public async execute({
    id,
    title,
    type,
    value,
  }: Request): Promise<Transaction> {
    const transactionsRepository = new TransactionsRepository();
    const transaction: Transaction = {
      id,
      title,
      type,
      value,
    };

    const response = await transactionsRepository.create(transaction);

    return response;
  }
}
export default CreateTransactionService;
