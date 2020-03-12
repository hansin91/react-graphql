import { Router } from 'express'
import entertainmeRoutes from './entertainme'
const router = Router()
router.use('/entertainme', entertainmeRoutes)
export default router