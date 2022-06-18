const Joi = require("joi");

const creationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().max(10).required(),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(30),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
}).min(1);

const updateFavouriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const registrationSchema = Joi.object({
  password: Joi.string().required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = {
  creationSchema,
  updateSchema,
  updateFavouriteSchema,
  registrationSchema,
  loginSchema,
  subscriptionSchema,
};
