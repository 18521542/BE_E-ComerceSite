const model = require('../model');
const BaseService = require('./base.service');

const modelShop = model.getInstance().Shop;

class ShopService extends BaseService {
  static getAllShop() {
    return modelShop.findAll({
      raw: true,
    });
  }

  static findShopById(shopid) {
    return modelShop.findByPk(shopid);
  }

  static async findShopInTable(dataprop, prop) {
    let resShop = await modelShop.findOne({
      where: {
        username: dataprop,
      },
      raw: false,
    });
    return resShop;
  }

  static async createNewShop(newShop) {
    const resultFindShop = await this.findShopInTable(newShop.username);
    // check if result is found or not
    if (resultFindShop) {
      return 'One account for one shop, please check again!';
    } else {
      await modelShop.create({
        id: newShop.id,
        name: newShop.name,
        email: newShop.email,
        address: newShop.address,
        telephone: newShop.telephone,
        username: newShop.username,
        created_at: newShop.currentDate,
        updated_at: newShop.currentDate,
      });
      const mess = {
        mess: 'create shop successfully',
        data: {
          id: newShop.id,
          name: newShop.name,
          email: newShop.email,
          address: newShop.address,
          telephone: newShop.telephone,
          username: newShop.username,
        },
      };
      return mess;
    }
  }
}

module.exports = ShopService;
