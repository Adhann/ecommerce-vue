const { User, Cart } = require('../models')

const authorizationAdmin = (req, res, next) => {
  const id = +req.decoded.id
  if (!id) {
    res.status(400).json({ errors: 'Invalid Input'})
  } else {
    User.findByPk(id)
    .then((data) => {
      if(!data) throw { name: 'Error404', status: 404, msg: 'Error Not Found !!'}
      if (req.decoded.role === 'admin') {
        next()
      } else {
        throw { name: 'Error401', status: 401, msg: 'Access denied, you not authorized !!'}
      }
    })
    .catch((err) => {
      next(err)
    });
  }
}

const authorizationCustomer = (req, res, next) => {
  const id = +req.params.id
  // const id = 3
  if (!id) {
    res.status(400).json({ errors: 'Invalid Input'})
  } else {
    Cart.findOne({
      where: {
        id
      }
    })
    .then((data) => {
      if(!data) throw { name: 'Error404', status: 404, msg: 'Error Not Found !!'}
      if (data.user_id === +req.decoded.id) {
        next()
      } else {
        throw { name: 'Error401', status: 401, msg: 'Access denied, you not authorized !!'}
      }
    })
    .catch((err) => {
      next(err)
    });
  }
}

module.exports = {
  authorizationAdmin,
  authorizationCustomer
}