import { Router } from 'express'
import MovieController from '../controllers/movie'
import uploadImage from '../middlewares/uploadImage'
const router = Router()

router.post('/', uploadImage, MovieController.insertMovie)
router.get('/', MovieController.fetchMovies)
router.get('/:id', MovieController.findOne)
router.put('/:id', MovieController.updateMovie)
router.delete('/:id', MovieController.deleteMovie)
export default router