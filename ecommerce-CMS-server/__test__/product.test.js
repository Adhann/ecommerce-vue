const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jwt')
const { Product, sequelize } = require('../models/')

let access_token = ''
let id = 0

beforeAll((done) => {
  access_token = generateToken({
    id: 1,
    name: 'admin',
    email: 'admin@mail.com',
    role: 'admin'
  })
  done()
})

afterAll((done) => {
  sequelize.close()
  done()
})

describe('POST /products', () => {
  it('should return status 200 with data', (done) => {
    
    let body = {
      name: "Razer BlackWidow V3 - Green Switch - US - Quartz",
      description: "keyboard razer",
      price: 90000,
      stock: 10,
      category: "keyboard",
      image_url: "https://assets3.razerzone.com/osLCaLKhvIBopNS-eT6CUPtneCY=/300x300/https%3A%2F%2Fhybrismediaprod.blob.core.windows.net%2Fsys-master-phoenix-images-container%2Fh20%2Fhf0%2F9090120712222%2Fblackwidow-v3-500x500-quartz.png",
    }

    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        
        expect(res.status).toEqual(200)
        
        expect(access_token).toBeTruthy()
        expect(typeof res.body).toEqual('object')
        
        expect(res.body).toHaveProperty("id")
        expect(res.body).toHaveProperty("name")
        expect(res.body).toHaveProperty("description")
        expect(res.body).toHaveProperty("price")
        expect(res.body).toHaveProperty("stock")
        expect(res.body).toHaveProperty("category")
        expect(res.body).toHaveProperty("image_url")
        expect(res.body).toHaveProperty("createdAt")
        expect(res.body).toHaveProperty("updatedAt")

        
        expect(res.body.id).toEqual(res.body.id)
        expect(res.body.name).toEqual(body.name)
        expect(res.body.description).toEqual(body.description)
        expect(res.body.price).toEqual(body.price)
        expect(res.body.stock).toEqual(body.stock)
        expect(res.body.category).toEqual(body.category)
        expect(res.body.image_url).toEqual(body.image_url)
        expect(res.body.createdAt).toEqual(res.body.createdAt)
        expect(res.body.updatedAt).toEqual(res.body.updatedAt)

        expect(typeof res.body.id).toEqual('number')
        expect(typeof res.body.name).toEqual('string')
        expect(typeof res.body.description).toEqual('string')
        expect(typeof res.body.price).toEqual('number')
        expect(typeof res.body.stock).toEqual('number')
        expect(typeof res.body.category).toEqual('string')
        expect(typeof res.body.image_url).toEqual('string')
        expect(typeof res.body.createdAt).toEqual('string')
        expect(typeof res.body.updatedAt).toEqual('string')

        expect(res.body.price).toBeGreaterThanOrEqual(0)
        expect(res.body.stock).toBeGreaterThanOrEqual(0)

        id = res.body.id
        done()
      })
  })
})

describe('GET /products', () => {
  it('should return status 200 with data', (done) => {
    
    request(app)
      .get('/products')
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        
        expect(res.status).toEqual(200)
        expect(access_token).toBeTruthy()
        expect(Array.isArray(res.body)).toEqual(true)

        expect(res.body[0]).toHaveProperty("id")
        expect(res.body[0]).toHaveProperty("name")
        expect(res.body[0]).toHaveProperty("description")
        expect(res.body[0]).toHaveProperty("price")
        expect(res.body[0]).toHaveProperty("stock")
        expect(res.body[0]).toHaveProperty("category")
        expect(res.body[0]).toHaveProperty("image_url")
        expect(res.body[0]).toHaveProperty("createdAt")
        expect(res.body[0]).toHaveProperty("updatedAt")
        
        done()
      })
  })
})

describe('PUT /products/:id', () => {
  describe('Success process',() => {
    it('success update product, and should return status 200 with data', (done) => {
      // console.log(id, "<ID DAPET GK")
      let body = {
        name: "Razer BlackWidow V3 - Green Switch - US - Quartz EDITT",
        description: "keyboard razer",
        price: 5000,
        stock: 2,
        category: "keyboard",
        image_url: "https://assets3.razerzone.com/osLCaLKhvIBopNS-eT6CUPtneCY=/300x300/https%3A%2F%2Fhybrismediaprod.blob.core.windows.net%2Fsys-master-phoenix-images-container%2Fh20%2Fhf0%2F9090120712222%2Fblackwidow-v3-500x500-quartz.png",
      }

      request(app)
        .put(`/products/${id}`)
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          
          expect(res.status).toEqual(200)
          
          expect(access_token).toBeTruthy()
          expect(typeof res.body).toEqual('object')
          
          expect(res.body).toHaveProperty("id")
          expect(res.body).toHaveProperty("name")
          expect(res.body).toHaveProperty("description")
          expect(res.body).toHaveProperty("price")
          expect(res.body).toHaveProperty("stock")
          expect(res.body).toHaveProperty("category")
          expect(res.body).toHaveProperty("image_url")
          expect(res.body).toHaveProperty("createdAt")
          expect(res.body).toHaveProperty("updatedAt")

          
          expect(res.body.id).toEqual(res.body.id)
          expect(res.body.name).toEqual(body.name)
          expect(res.body.description).toEqual(body.description)
          expect(res.body.price).toEqual(body.price)
          expect(res.body.stock).toEqual(body.stock)
          expect(res.body.category).toEqual(body.category)
          expect(res.body.image_url).toEqual(body.image_url)
          expect(res.body.createdAt).toEqual(res.body.createdAt)
          expect(res.body.updatedAt).toEqual(res.body.updatedAt)

          expect(typeof res.body.id).toEqual('number')
          expect(typeof res.body.name).toEqual('string')
          expect(typeof res.body.description).toEqual('string')
          expect(typeof res.body.price).toEqual('number')
          expect(typeof res.body.stock).toEqual('number')
          expect(typeof res.body.category).toEqual('string')
          expect(typeof res.body.image_url).toEqual('string')
          expect(typeof res.body.createdAt).toEqual('string')
          expect(typeof res.body.updatedAt).toEqual('string')

          expect(res.body.price).toBeGreaterThanOrEqual(0)
          expect(res.body.stock).toBeGreaterThanOrEqual(0)

          done()
        })
    })
  })
  describe('Error process',() => {
    it("Fail when name field empty, should return object with message", (done) => {
      const body = {
        name: "",
        description: "keyboard razer",
        price: 90000,
        stock: 10,
        category: "keyboard",
        image_url: "https://assets3.razerzone.com/osLCaLKhvIBopNS-eT6CUPtneCY=/300x300/https%3A%2F%2Fhybrismediaprod.blob.core.windows.net%2Fsys-master-phoenix-images-container%2Fh20%2Fhf0%2F9090120712222%2Fblackwidow-v3-500x500-quartz.png",
      }
      request(app)
        .post("/products")
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
          if (err) done(err)

          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("errors")
          expect(Array.isArray(res.body.errors)).toEqual(true)
          expect(res.body.errors[0]).toEqual("The Name field is required")
          done()
        })
    })
    it("Fail when description field empty, should return object with message", (done) => {
      const body = {
        name: "Razer",
        description: "",
        price: 90000,
        stock: 10,
        category: "keyboard",
        image_url: "https://assets3.razerzone.com/osLCaLKhvIBopNS-eT6CUPtneCY=/300x300/https%3A%2F%2Fhybrismediaprod.blob.core.windows.net%2Fsys-master-phoenix-images-container%2Fh20%2Fhf0%2F9090120712222%2Fblackwidow-v3-500x500-quartz.png",
      }
      request(app)
        .post("/products")
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
          if (err) done(err)

          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("errors")
          expect(Array.isArray(res.body.errors)).toEqual(true)
          expect(res.body.errors[0]).toEqual("The Description field is required")
          done()
        })
    })
    it("Fail when price field empty, should return object with message", (done) => {
      const body = {
        name: "Razer",
        description: "Keyboard razer",
        price: '',
        stock: 10,
        category: "keyboard",
        image_url: "https://assets3.razerzone.com/osLCaLKhvIBopNS-eT6CUPtneCY=/300x300/https%3A%2F%2Fhybrismediaprod.blob.core.windows.net%2Fsys-master-phoenix-images-container%2Fh20%2Fhf0%2F9090120712222%2Fblackwidow-v3-500x500-quartz.png",
      }
      request(app)
        .post("/products")
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
          if (err) done(err)

          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("errors")
          expect(Array.isArray(res.body.errors)).toEqual(true)
          expect(res.body.errors[0]).toEqual("The Price field is required")
          done()
        })
    })
    it("Fail when stock field empty, should return object with message", (done) => {
      const body = {
        name: "Razer",
        description: "Keyboard razer",
        price: 9000000,
        stock: '',
        category: "keyboard",
        image_url: "https://assets3.razerzone.com/osLCaLKhvIBopNS-eT6CUPtneCY=/300x300/https%3A%2F%2Fhybrismediaprod.blob.core.windows.net%2Fsys-master-phoenix-images-container%2Fh20%2Fhf0%2F9090120712222%2Fblackwidow-v3-500x500-quartz.png",
      }
      request(app)
        .post("/products")
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
          if (err) done(err)

          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("errors")
          expect(Array.isArray(res.body.errors)).toEqual(true)
          expect(res.body.errors[0]).toEqual("The Stock field is required")
          done()
        })
    })
    it("Fail when category field empty, should return object with message", (done) => {
      const body = {
        name: "Razer",
        description: "Keyboard razer",
        price: 900000,
        stock: 10,
        category: "",
        image_url: "https://assets3.razerzone.com/osLCaLKhvIBopNS-eT6CUPtneCY=/300x300/https%3A%2F%2Fhybrismediaprod.blob.core.windows.net%2Fsys-master-phoenix-images-container%2Fh20%2Fhf0%2F9090120712222%2Fblackwidow-v3-500x500-quartz.png",
      }
      request(app)
        .post("/products")
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
          if (err) done(err)

          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("errors")
          expect(Array.isArray(res.body.errors)).toEqual(true)
          expect(res.body.errors[0]).toEqual("The Category field is required")
          done()
        })
    })
    it("Fail when image_url field empty, should return object with message", (done) => {
      const body = {
        name: "Razer",
        description: "Keyboard razer",
        price: 90000,
        stock: 10,
        category: "keyboard",
        image_url: "",
      }
      request(app)
        .post("/products")
        .set('access_token', access_token)
        .send(body)
        .end((err, res) => {
          if (err) done(err)

          expect(res.status).toEqual(400)
          expect(typeof res.body).toEqual("object")
          expect(res.body).toHaveProperty("errors")
          expect(Array.isArray(res.body.errors)).toEqual(true)
          expect(res.body.errors[0]).toEqual("The Image field is required")
          done()
        })
    })
  })
})

describe('DELETE /products/:id', () => {
  it('success delete product, and should return status 200 with data', (done) => {
    request(app)
      .delete(`/products/${id}`)
      .set('access_token', access_token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        
        expect(res.status).toEqual(200)
        
        expect(access_token).toBeTruthy()
        expect(typeof res.body).toEqual('object')
        
        expect(typeof res.body.message).toEqual('string')

        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Product success to delete!!')

        done()
      })
  })
})