const { verify } = require('../helpers/jwt')

const authentication = function (req, res, next) {
  try {
    const access_token = req.headers.access_token
    const decoded = verify(access_token)
    
    req.decoded = decoded
    
    next()
  } catch (err) {
    next({status: 401, msg: 'Invalid Token'})
  }
}

module.exports = authentication 