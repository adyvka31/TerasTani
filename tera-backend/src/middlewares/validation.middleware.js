/**
 * Request Validation Middleware
 * Executes schema validators against req.body, req.query, or req.params
 */
const ApiError = require('../utils/api-error');

function validate(schemaValidator) {
  return (req, res, next) => {
    const { errors, sanitizedData } = schemaValidator(req.body);
    if (errors && errors.length > 0) {
      throw ApiError.badRequest(errors[0], undefined, errors);
    }
    req.body = sanitizedData;
    next();
  };
}

module.exports = validate;
