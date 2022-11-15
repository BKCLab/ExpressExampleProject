function validate(data, schema) {
  const {error} = schema.validate(data, {abortEarly: false});
  if (!error) return null;
  const errors = {};
  for (let err of error.details) errors[err.context.key] = err.message;
  return errors;
}

function writeFile(data, path = './upload/avatar') {

}


module.exports = {validate}