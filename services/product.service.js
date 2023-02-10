const faker = require('faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit,
      options.offset = offset
    }
    const { price } = query;
    if (price) {
      options.where.price = price;
    }
    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      };
    }
    const Product = await models.Product.findAll(options);
    return Product;
  }

  async findOne(id) {
    const Product = await models.Product.findByPk(id);
    if (!Product) {
      throw boom.notFound('product not found');
    }
    return Product;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const response = await model.Product.update(changes)
    return response;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy()
    return { response: true };
  }

}

module.exports = ProductsService;
