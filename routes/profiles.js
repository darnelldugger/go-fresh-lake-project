import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index )
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.post('/:id/lakes', isLoggedIn, profilesCtrl.addLakeVisit)
router.post('/:id/personalbest', isLoggedIn, profilesCtrl.createPersonalBest)
router.get('/personalbest/:id/edit', isLoggedIn, profilesCtrl.showPersonalBest)
router.put('/personalbest/:id', isLoggedIn, profilesCtrl.update)
router.delete('/personalbest/:id', isLoggedIn, profilesCtrl.deletePersonalBest)

export {
  router
}