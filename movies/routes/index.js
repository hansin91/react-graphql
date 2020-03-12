import { Router } from 'express'
import movieRoutes from './movie'
const router = Router()

router.use('/movies', movieRoutes)
export default router