import Joi from 'joi'

// Create Restaurant Validation
export const createRestaurantValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  logo: Joi.string().default('restaurant_default.png'),
  address: Joi.array().items(
    Joi.object({
      city: Joi.string().required(),
      district: Joi.string().required(),
      street: Joi.string(),
      location: Joi.string(),
    })
  ),
  locations: Joi.array().items(Joi.string()),
  menus: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string(),
      image: Joi.string(),
    })
  ),
  types: Joi.array().items(Joi.string()),
  branches: Joi.array().items(
    Joi.object({
      city: Joi.string().required(),
      district: Joi.string().required(),
      street: Joi.string(),
      location: Joi.string(),
    })
  ),
})