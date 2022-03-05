import { Router } from 'express'
const router = Router()
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'


router.get('/', isLoggedIn, profilesCtrl.index )
router.get('/:id', isLoggedIn, profilesCtrl.show)

export {
  router
}