import Joi from 'joi'

// Register 
export const registerValidation = Joi.object({
    username: Joi.string().required().min(3).max(75),
    password: Joi.string().required().min(6),
    email: Joi.string().email().required().min(8),
    age: Joi.number().required().min(18),
    gender: Joi.string().valid('Male', 'Female', 'Other'),
    profile_img: Joi.string().default("default.png"),
    addresses: Joi.array().items(
      Joi.object({
        city: Joi.string().required(),
        district: Joi.string().required(),
        street: Joi.string(),
        location: Joi.string(),
      })
    ),
  })