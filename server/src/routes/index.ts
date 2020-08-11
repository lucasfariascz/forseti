import { Router } from 'express';
import transaction from './transaction.routes';

const routes = Router();

routes.use('/transactions', transaction);

export default routes;
