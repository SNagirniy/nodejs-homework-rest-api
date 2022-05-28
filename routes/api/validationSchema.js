const Joi = require("joi");

const creationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
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

module.exports = { creationSchema, updateSchema };
