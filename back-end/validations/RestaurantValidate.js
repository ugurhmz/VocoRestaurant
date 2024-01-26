// RestaurantValidate.js
import Joi from 'joi';

// Create Menu Validation
export const menuValidation = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string(),
  image: Joi.string().default('menu_default.png'),
})
