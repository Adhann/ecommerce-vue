const errorHandler = (err, req, res, next) => {
  
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(el => el.message)
    res.status(400).json({ errors : errors })
  } else if (err.name === 'Error400' || err.name === 'Error401' || err.name === 'Error403' || err.name === 'Error404'){
    res.status(err.status).json({ errors: err.msg })
  } else {
    const errors = err.msg || 'Internal Server Error'
    const status = err.status || 500
    res.status(status).json({ errors })
  }

}

module.exports = errorHandler