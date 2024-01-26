import Joi from 'joi'

// Register Validation
export const registerValidation = Joi.object({
  username: Joi.string().min(3).max(75).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().min(8).required(),
  age: Joi.number().min(18).required(),
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

// Login Validation
export const loginValidation = Joi.object({
  email: Joi.string().email().min(8).required(),
  password: Joi.string().min(6).required(),
})