import { Router } from 'express'
import * as lakesCtrl from '../controllers/lakes.js'

const router = Router()

router.get('/', lakesCtrl.index)

export {
  router
}