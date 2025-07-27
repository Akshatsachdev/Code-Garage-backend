import { Router } from 'express';
import { aiChatController, expenseInsightsController } from '../controllers/ai.controller';

const router = Router();

router.post('/chat', aiChatController);
router.post('/insights', expenseInsightsController);

export default router;