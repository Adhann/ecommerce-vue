'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart, { foreignKey: 'product_id' })
      Product.belongsToMany(models.User, { through : models.Cart, foreignKey: 'product_id'})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The Name field is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The Description field is required'
        }
      }
    },
    price: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The Price field is required'
        }
      }
    },
    stock: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The Stock field is required'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The Category field is required'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The Image field is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};