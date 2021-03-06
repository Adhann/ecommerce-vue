const { User } = require('../models/')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
// const { OAuth2Client } = require('google-auth-library')

class UserController {

  static register(req, res, next) {
    const { name, email, password } = req.body
    User.create({ name, email, password })
    .then((data) => {
      res.status(201).json(data)
    })
    .catch((err) => {
     next(err)
    })
  }

  static login(req, res, next) {
    const { email, password } = req.body
    const options = {
      where: {
        email
      }
    }
    User.findOne(options)
    .then((user) => {
      if (!user) throw { name: 'Error400', status: 400, msg: 'Invalid email or password' }
      
      const comparedPassword = comparePass(password, user.password)
      if (!comparedPassword) throw { name: 'Error400', status: 400, msg: 'Invalid email or password' }

      const access_token = generateToken({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      })

      console.log(access_token);
      
      const name = user.name
      
      res.status(200).json({ access_token, name})
    })
    .catch((err) => {
      console.log(err);
      next(err)
    })
  }

  
  // static googleLogin(req, res, next) {
  //   const client = new OAuth2Client(process.env.CLIENT_ID)
  //   let email = ""
  //   let name = ""

  //   client.verifyIdToken({
  //     idToken: req.body.googleToken,
  //     audience: process.env.CLIENT_ID,
  //   })
  //   .then((ticket) => {
  //     const payload = ticket.getPayload()
  //     console.log(payload);
  //     name = payload.name
  //     email = payload.email
      
  //     return User.findOne({ where: { email } })
  //   })
  //   .then((user) => {
  //     if (user) {
  //       const access_token = generateToken({
  //         id: user.id,
  //         email: user.email,
  //         name: user.name
  //       })
  //       res.status(200).json({ access_token, id: user.id, name: user.name, email: user.email })
  //     } else {
  //       return User.create({
  //         name,
  //         email,
  //         password: process.env.USER_PWD_GOOGLE
  //       })
  //     }
  //   })
  //   .then((registeredUser) => {
  //     console.log(registeredUser, "REGISTERED USER");
  //     const access_token = generateToken({
  //       id: registeredUser.id,
  //       email: registeredUser.email,
  //       name: registeredUser.name

  //     })
  //     res.status(201).json({ access_token, id: registeredUser.id, name: registeredUser.name, email: registeredUser.email })
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }

}

module.exports = UserController