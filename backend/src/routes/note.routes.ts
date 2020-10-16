import {Router} from 'express'
import {
  getNoteList,
  createNote
} from '../controllers/note.controller'

const router = Router();

router.get('/list', getNoteList);
router.post('/new', createNote);

export default router;