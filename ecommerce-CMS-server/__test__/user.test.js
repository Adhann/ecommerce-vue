const request = require('supertest')
const app = require('../app')
const { User, sequelize } = require('../models/')
const { hashPass, comparePass } = require('../helpers/bcrypt');
const { generateToken, verify } = require('../helpers/jwt')

// let access_token = ''

beforeAll((done) => {
  // User.create({
  //     name: "admin",
  //     email: "admin1@mail.com",
  //     password: hashPass('123456'),
  //     role: "admin",
  // })
  // .then((response) => {
  //   data = response.dataValues
  //   done();
  // })
  // .catch((err) => {
  //   console.log(err);
  // })
  done()

})

afterAll((done) => {
  // User.destroy({ where: {} })
  // .then(() => {
  // sequelize.close()
  // done()
  // })
  // .catch((err) => {
  //   done(err)
  // })
  sequelize.close()
  done()
})

describe("POST /users/login", () => {
  it('should return status 200 with data', (done) => {
    let user = {
      email: 'admin@mail.com',
      password: '123456'
    }

    request(app)
      .post('/users/login')
      .send(user)
      .end((err, res) => {
        if(err) { done(err) }

        expect(res.status).toEqual(200)

        expect(typeof res.body).toEqual('object')
        expect(typeof res.body.access_token).toEqual('string')
        expect(res.body).toHaveProperty('access_token')

        done()
      })
  })
  
  it('if email and password is wrong, should return error message with status 400', (done) => {
    let user = {
      email: 'admiasdn@mail.com',
      password: 'random'
    }

    request(app)
      .post('/users/login')
      .send(user)
      .end((err, res) => {
        if(err) { done(err) }

        expect(res.status).toEqual(400)

        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toEqual('Invalid email or password')

        done()
    })
  })

  it('if password wrong should return error message with status 400', (done) => {
    let user = {
      email: 'admin@mail.com',
      password: 'random'
    }

    request(app)
      .post('/users/login')
      .send(user)
      .end((err, res) => {
        if(err) { done(err) }

        expect(res.status).toEqual(400)

        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toEqual('Invalid email or password')

        done()
    })
  })

  it('if email wrong should return error message with status 400', (done) => {
    let user = {
      email: 'adminasd@mail.com',
      password: '123456'
    }

    request(app)
      .post('/users/login')
      .send(user)
      .end((err, res) => {
        if(err) { done(err) }

        expect(res.status).toEqual(400)

        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toEqual('Invalid email or password')

        done()
    })
  })
})

