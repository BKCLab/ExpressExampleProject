const z = require("zod");

const createStudentSchema = z.object({
  studentId: z.string().min(8).max(9),
  name: z.string(),
  dob: z.string(),
  address: z.string(),
});

const updateStudentSchema = z.object({
  studentId: z.string().min(8).max(9),
  name: z.string().optional(),
  dob: z.string().optional(),
  address: z.string().optional(),
});

module.exports = { createStudentSchema, updateStudentSchema };
