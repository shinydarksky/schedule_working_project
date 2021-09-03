import express from 'express'
import { staffController, staffWeekController, staffEditController } from '../controllers/staffController.js'
const router = express.Router()

router.get('/',staffController)

router.post('/week',staffWeekController)

router.post('/edit',staffEditController)

export default router