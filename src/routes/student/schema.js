const z = require("zod");

const studentSchema = z.object({
  studentId: z.string().length(8),
  name: z.string(),
  dob: z.string(),
  address: z.string(),
});

module.exports = { studentSchema };
