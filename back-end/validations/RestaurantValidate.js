import Joi from 'joi';

// Create Restaurant Validation
export const createRestaurantValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  logo: Joi.string().default('doner_logo.png'),
  address: Joi.array().items(Joi.string().required()), // Adreslerin sadece ID'lerini içeriyor
  locations: Joi.array().items(Joi.string().required()),
  menus: Joi.array().items(Joi.string().required()), // Menülerin sadece ID'lerini içeriyor
  types: Joi.array().items(Joi.string().required()),
  branches: Joi.array().items(Joi.string().required()), // Şubelerin sadece ID'lerini içeriyor
});
