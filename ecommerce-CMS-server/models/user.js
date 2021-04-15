'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart, { foreignKey: 'user_id' })
      User.hasMany(models.Transaction, { foreignKey: 'user_id' })
      User.belongsToMany(models.Product, { through : models.Cart, foreignKey: 'user_id'})
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The Name field is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The Email field is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The Password field is required'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The Role field is required'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, opt) => {
        if (!user.role) user.role = 'customer';
        user.password = hashPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};