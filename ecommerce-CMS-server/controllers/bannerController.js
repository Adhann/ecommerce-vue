const { Banner } = require('../models/')
class BannerController {
  static createBanner(req, res, next) {
    const { title, status, image_url } = req.body
    Banner.create({
      title,
      status,
      image_url
    })
      .then(newBanner => {
        res.status(201).json(newBanner)
      })
      .catch(err => {
        next(err)
      })
  }

  static getAllBanner(req, res, next) {
    Banner.findAll()
      .then(banners => {
        res.status(200).json(banners)
      })
      .catch(err => {
        next(err)
      })
  }

  static getBannerById(req, res, next) {
    const id = +req.params.id
    Banner.findOne({
      where: { id: id }
    })
      .then(banner => {
        if (!banner) throw { name: "Error404", status: 404, msg: 'Banner not found!' }
        res.status(200).json(banner)
      })
      .catch(err => {
        next(err)
      })
  }

  static updateBanner(req, res, next) {
    const { title, status, image_url } = req.body
    const id = +req.params.id
    const option = {
      where: {
        id
      },
      returning: true
    }

    Banner.update({ title, status, image_url }, option)
    .then((updateProduct) => {
      // console.log(updateProduct, "<<update");
      if(!updateProduct[1][0]) throw { name: 'Error404', status: 404, msg: 'Error Not Found !!'}

      res.status(200).json(updateProduct[1][0])
    })
    .catch((err) => {
      next(err)
    })
  }

  static deleteBanner(req, res, next) {
    const id = +req.params.id
    // let deletedBanner

    Banner.findByPk(id)
      .then(banner => {
        if(!banner) throw { name: 'Error404', status: 404, msg: 'Error Not Found !!'}

        // deletedBanner = banner

        return Banner.destroy({
          where: { id }
        })
      })
      .then(() => {
        res.status(200).json({ message: 'Success delete banner' })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = BannerController