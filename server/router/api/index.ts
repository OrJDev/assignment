import { Router } from 'express';
import { Gender, Nation, All } from './controller';

const router = Router();

router.get('/gender/:name', Gender)
router.get('/nation/:name', Nation)
router.get('/all/:name', All)

export default router;