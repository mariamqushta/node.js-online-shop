import Joi from "joi";

export let userValidation = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  email: Joi.string().email().max(50).required(),
  password: Joi.string().min(6).required(),
  ProfileImage: Joi.string().optional(),
  role: Joi.string().valid("user", "admin").optional(),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const productValidation =Joi.object({
  name: Joi.string().required(),
  type: Joi.string().optional(),
  img: Joi.string().required(),
  cost: Joi.number().required(),
  rate: Joi.number().optional(),
  description: Joi.string().optional(),
  description2: Joi.string().optional(),
})