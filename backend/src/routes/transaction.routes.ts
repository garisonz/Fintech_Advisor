// routes/transaction.routes.ts
import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';

const router = Router();

router.post('/', TransactionController.createTransaction);

export default router;