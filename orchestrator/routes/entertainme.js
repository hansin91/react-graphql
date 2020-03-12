import { Router } from 'express'
import EntertainmeController from '../controllers/entertainme'
const router = Router()

router.get('/', EntertainmeController.fetchAllData)
export default router