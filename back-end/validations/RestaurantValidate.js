import Joi from 'joi'

// Create Restaurant Validation
export const createRestaurantValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  logo: Joi.string().default('doner_logo.png'),
  address: Joi.array().items(Joi.string().required()), 
  locations: Joi.array().items(Joi.string().required()),
  menus: Joi.array().items(Joi.string().required()),
  types: Joi.array().items(Joi.string().required()),
  branches: Joi.array().items(Joi.string().required()),
})

// Create Menu
export const menuValidation = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string(),
  image: Joi.string().default('menu_default.png'),
})