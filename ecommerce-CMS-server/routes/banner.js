const router = require('express').Router()
const BannerController = require('../controllers/bannerController')
const authentication = require('../middlewares/authentication')
const { authorizationAdmin } = require('../middlewares/authorization')
const multer = require('../middlewares/multer')

router.use(authentication)
router.use('/:id', authorizationAdmin)
router.post('/', multer.single('image'), BannerController.createBanner)

router.get('/', BannerController.getAllBanner)
router.get('/:id', BannerController.getBannerById)

router.put('/:id', multer.single('image'), BannerController.updateBanner)
router.delete('/:id', BannerController.deleteBanner)

module.exports = router