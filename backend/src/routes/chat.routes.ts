import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";

const router = Router();

router.get('/:userId', ChatController.getChat);
router.post('/', ChatController.createChat);
router.post('/:chatId/messages', ChatController.addMessage);
router.delete('/:userId', ChatController.deleteChat);

export default router;
