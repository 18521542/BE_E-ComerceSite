class AppError extends Error {
  constructor(message = 'Internal Service Error') {
    super(message);
    this.name = this.constructor.name;
    this.status = 500;
    Error.captureStackTrace(this, AppError);
  }
}

module.exports = AppError;
