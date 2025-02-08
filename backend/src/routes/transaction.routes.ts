import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';

const router = Router();


router.get('/', TransactionController.getTransactions);
router.get('/:id', TransactionController.getTransactionById);
router.post('/', TransactionController.createTransaction);

export default router;