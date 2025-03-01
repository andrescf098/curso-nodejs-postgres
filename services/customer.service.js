const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor(){

  }
  async find() {
    const response = await models.Customer.findAll({
      include: ['user']
    })
    return response;
  }
  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }
  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    })
    return newCustomer;
  }
  async update(id, change) {
    const model = await this.findOne(id);
    const response = await model.Customer.update(change);
    return response;
  }
  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { response: true }
  }
}

module.exports = CustomerService;
