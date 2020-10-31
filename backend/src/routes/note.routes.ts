import {Router} from 'express'
import {
  getNoteList,
  createNote,
  getNoteById,
  deleteNoteById
} from '../controllers/note.controller'

const router = Router();

router.get('/api/notes', getNoteList);
router.get('/api/notes/:id', getNoteById);
router.post('/api/notes', createNote);
router.delete('/api/notes/:id', deleteNoteById)

export default router;