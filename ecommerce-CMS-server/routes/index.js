const router = require('express').Router()

const userRouter = require('./user')
const productRouter = require('./product')
const bannerRouter = require('./banner')
const cartRouter = require('./cart')
const transactionRouter = require('./transaction')

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/banners', bannerRouter)
router.use('/carts', cartRouter)
router.use('/transaction', transactionRouter)

module.exports = router