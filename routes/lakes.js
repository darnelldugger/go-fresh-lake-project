import { Router } from 'express'
import * as lakesCtrl from '../controllers/lakes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', lakesCtrl.index)
router.get('/new', isLoggedIn, lakesCtrl.new)
router.post('/', isLoggedIn, lakesCtrl.create)
router.get('/:id', lakesCtrl.show)
router.get('/:id/edit', isLoggedIn, lakesCtrl.edit)

export {
  router
}