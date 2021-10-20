const AppError = require('../AppError/index');

class BusinessError extends AppError {
  constructor(message = 'There is business error happened') {
    super(message);
    this.name = 'BusinessError';
    this.status = 400;
  }
}

/**
 * AuthenticationError - Returns a 401 You need to authenicate to access this resource,
 * implying that the user does not have enough premissions to complete this request.
 *
 * @param  {String} message - A message sent to the user why he/she is not authenticated
 * @return {Object}  - Error object
 */
class AuthenticationError extends BusinessError {
  constructor(message = 'You need to authenticate to access this resource') {
    super(message);
    this.name = 'AuthenticationError';
    this.status = 401;
  }
}

module.exports = Error;
