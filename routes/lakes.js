import { Router } from 'express'
import * as lakesCtrl from '../controllers/lakes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', lakesCtrl.index)
router.get('/new', isLoggedIn, lakesCtrl.new)
router.post('/', isLoggedIn, lakesCtrl.create)
router.get('/:id', lakesCtrl.show)
router.get('/:id/edit', isLoggedIn, lakesCtrl.edit)
router.post('/:id/fishes', lakesCtrl.addToFishCaught)
router.post('/:id/reviews', lakesCtrl.createReview)
router.put('/:id', isLoggedIn, lakesCtrl.update)


export {
  router
}