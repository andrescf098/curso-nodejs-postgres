const express = require('express');

const CustomerService = require('../services/customer.service');
const validationHandler = require('../middlewares/validator.handler');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema
} = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.get('/', async(req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error)
  }
});

router.post('/',
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error)
    }
});

router.patch('/',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.params;
      res.status(201).json(await service.update(id, body))
    } catch (error) {
      next(error)
    }
});

router.delete('/', validationHandler(getCustomerSchema, 'params'), async (res, req, next) => {
  try {
    const { id } = req.params;
    res.status(201).json(await service.delete(id))
  } catch (error) {
    next(error)
  }
});

module.exports = router;
