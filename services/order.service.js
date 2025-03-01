const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize')

class OrderService {

  constructor(){
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }
  async addItem(data){
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'item'
      ]
    });
    if (!order) {
      throw boom.notFound('order not found');
    }
    return order;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const response = await model.update(changes);
    response ;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy()
    return { response: true };
  }

}

module.exports = OrderService;
