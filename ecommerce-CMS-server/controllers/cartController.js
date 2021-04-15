const { Cart, Product } = require('../models/')

class CartController {
  static getAllCartById(req, res, next) {
    // res.send('asd')
    const id = +req.decoded.id
    Cart.findAll({
      attributes: ["id", "product_id", "user_id", "quantity"],
      where: {
        user_id: id,
      },
      include: Product
    })
    .then((carts) => {
      console.log('asd');
      res.status(200).json(carts)
    })
    .catch((err) => {
      console.log(err)
      next(err)
    })
  }

  static createCart(req, res, next) {
    const product_id  = +req.params.id
    const user_id = +req.decoded.id
    console.log(product_id, '<<<<<<<<<<<<<')
    Cart.findOne({
      attributes: ["id", "product_id", "user_id", "quantity"],
      where: {
        product_id,
        user_id
      }
    })
    .then((cart) => {
      console.log(cart ,'cart')
      if (!cart) {
        return Cart.create({
          product_id,
          user_id,
          quantity: 1
        }, {
          returning: true
        })
        .then((newProduct) => {
          res.status(201).json(newProduct)
        }).catch((err) => {
          console.log({err})
          next(err)
        })
      } else {
        let newQuantity = cart.quantity + 1
        return Product.findOne({
          where: {
            id: product_id
          }
        })
        .then((product) => {
          
          if (product.stock <= 0) throw { name: 'Error400', status: 400, msg: 'Out of Stock !!'}
          
          if (newQuantity > product.stock) throw { name: 'Error400', status: 400, msg: `Total stock product available is ${product.stock}`}

          if (newQuantity <= product.stock) {
            return Cart.update({
              quantity: newQuantity
            }, {
              attributes: ["id", "product_id", "user_id", "quantity"],
              where: { id: cart.id },
              returning: true
            })
            .then((data) => {
              res.status(200).json(data[1][0])
            })
            .catch((err) => {
              next(err)
            })
          }
          res.status(200).json(product)
        }).catch((err) => {
          console.log({err})
          next(err)
        })
      }
    })
    .catch((err) => {
      console.log({err})
      next(err)
    })
  }

  static updateQuantity(req, res, next) {
    const { quantity, product_id } = req.body
    const id = +req.params.id
    
    Product.findOne({
      where: {
        id : product_id
      }
    })
    .then((product) => {
      console.log(product, '<<<PROD')
      if (product.stock >= +quantity) {
        return Cart.update({
          quantity
        }, {
          where: {
            id,
          },
          // attributes: ["id", "product_id", "user_id", "quantity"],
          returning: true
        })
      } else {
        throw { name: 'Error400', status: 400, msg: `Total stock product available is ${product.stock}`}
      }
    })
    .then((data) => {
      // res.status(200).json(data[1][0])
      res.status(200).json({ message: 'Success update cart' })
    })
    .catch((err) => {
      next(err)
    })
  }

  static deleteCart(req, res, next) {
    const id = +req.params.id
    Cart.destroy({
      where: {
        id
      }
    })
    .then((data) => {
      res.status(200).json({ message: 'Success delete cart' })
    })
    .catch((err) => {
      next(err)
    })
  }
}

module.exports = CartController