import { Router } from 'express'
import TVSerieController from '../controllers/tvserie'
const router = Router()

router.post('/', TVSerieController.insertSerieMovie)
router.get('/', TVSerieController.fetchSerieMovies)
router.get('/:id', TVSerieController.findOne)
router.put('/:id', TVSerieController.updateSerieMovie)
router.delete('/:id', TVSerieController.deleteSerieMovie)
export default router