import { Router } from 'express'
import MovieController from '../controllers/movie'
const router = Router()

router.post('/', MovieController.insertMovie)
router.get('/', MovieController.fetchMovies)
router.put('/:id', MovieController.updateMovie)
router.delete('/:id', MovieController.deleteMovie)
export default router