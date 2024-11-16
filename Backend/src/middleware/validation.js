import Joi from "joi";

export const contactValidation = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string(),
  phonenumber: Joi.number().max(9999999999),
  company: Joi.string(),
  jobtitle: Joi.string(),
});
