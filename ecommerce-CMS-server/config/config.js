if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}

// if (process.env.NODE_ENV !== 'development') {
//   require('dotenv').config()
// }

console.log(process.env.NODE_ENV)

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME_DEV,
    "password": process.env.DB_PASSWORD_DEV,
    "database": process.env.DB_DATABASE_DEV,
    "host": process.env.DB_HOST_DEV,
    "dialect": process.env.DB_DIALECT_DEV
  },
  "test": {
    "username": process.env.DB_USERNAME_TEST,
    "password": process.env.DB_PASSWORD_TEST,
    "database": process.env.DB_DATABASE_TEST,
    "host": process.env.DB_HOST_TEST,
    "dialect": process.env.DB_DIALECT_TEST
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialectOptions": {
      "ssl": {
          "rejectUnauthorized": false
      }
    }
  }
}
