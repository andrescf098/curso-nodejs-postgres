const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(10);
const lastName = Joi.string();
const phone = Joi.string().min(9);
const userId = Joi.number().integer();

const email = Joi.string().email();
const password = Joi.string();


const createCustomerSchema = Joi.object({
  id: id.required(),
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required()
  })
});

const getCustomerSchema = Joi.object({
  id: id.required()
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId
});

module.exports = { createCustomerSchema, getCustomerSchema, updateCustomerSchema }
