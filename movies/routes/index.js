import { Router } from '../node_modules/express'
import movieRoutes from './movie'
const router = Router()

router.use('/movies', movieRoutes)
export default router