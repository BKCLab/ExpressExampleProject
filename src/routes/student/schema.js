const Joi = require("joi");

const studentProfileSchema = Joi.object({
  studentId: Joi.string().length(8).required(),
  name: Joi.string().required(),
  dob: Joi.string().required(),
  address: Joi.string().optional(),
});

module.exports = {studentProfileSchema}
