import { Router } from 'express'
import tvSerieRoutes from './tvserie'
const router = Router()

router.use('/tvseries', tvSerieRoutes)
export default router