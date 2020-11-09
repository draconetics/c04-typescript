import {Router} from 'express'
import { 
    loginUser,
    logoutUser
  } from '../controllers/auth.controller'
import {auth} from '../middleware/auth.middleware'

const router = Router();

router.post('/api/login', loginUser);
router.post('/api/logout', auth, logoutUser);

export default router;