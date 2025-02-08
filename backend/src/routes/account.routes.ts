import { Router } from 'express';
import { AccountController } from '../controllers/account.controller';

const router = Router();

router.get('/', AccountController.getAccounts);
router.get('/:id', AccountController.getAccountById);
router.post('/', AccountController.createAccount);
router.patch('/:id', AccountController.updateAccount);
router.delete('/:id', AccountController.deleteAccount);

export default router;