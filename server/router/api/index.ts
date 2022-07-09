import { Router } from 'express';
import verifyName from '../../middlewares/verifyName';
import { Gender, Nation, All } from './controller';

const router = Router();

router.get('/gender/:name', verifyName, Gender)
router.get('/nation/:name', verifyName, Nation)
router.get('/all/:name', verifyName, All)

export default router;