import { Router } from 'express'
import TVSerieController from '../controllers/tvserie'
const router = Router()

router.get('/', TVSerieController.fetchSerieMovies)
router.post('/', TVSerieController.insertSerieMovie)
router.put('/:id', TVSerieController.updateSerieMovie)
router.delete('/:id', TVSerieController.deleteSerieMovie)
export default router