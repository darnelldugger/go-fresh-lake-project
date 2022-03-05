import { Router } from 'express'
import * as fishesCtrl from '../controllers/fishes.js'


const router = Router()

router.get('/', fishesCtrl.index)
router.get('/new', fishesCtrl.new)

export {
  router,
 
}