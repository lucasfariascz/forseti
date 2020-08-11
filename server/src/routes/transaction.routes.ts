import { Router } from 'express';
import { uuid } from 'uuidv4';
import CreateTrasactionService from '../services/CreateTransactionService';
import TransactionsRepository from '../repositories/TransactionsRepository';

const routes = Router();

routes.get('/', async (request, response) => {
  try {
    const transactionsRepository = new TransactionsRepository();
    const transactions = await transactionsRepository.all();
    const balance = await transactionsRepository.getBalance();

    return response.json({
      transactions,
      balance,
    });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

routes.post('/', async (request, response) => {
  try {
    const { title, type, value } = request.body;
    const createTrasactionService = new CreateTrasactionService();
    const transaction = await createTrasactionService.execute({
      id: uuid(),
      title,
      type,
      value,
    });
    return response.json(transaction);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

export default routes;
