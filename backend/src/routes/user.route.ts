import {Router} from 'express'
import { 
    getUserList, 
    createUser,
    getUserById
  
  } from '../controllers/user.controller'

const router = Router();

router.get('/api/user', getUserList);
router.get('/api/user/:id', getUserById);
router.post('/api/user', createUser);

export default router;