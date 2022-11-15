class BaseError extends Error {
  constructor(message, description, statusCode) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.description = description;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

class InputDataInvalid extends BaseError {
  constructor({message, description = message, statusCode = 400}) {
    super(message, description, statusCode);
  }
}


module.exports = {BaseError, InputDataInvalid};