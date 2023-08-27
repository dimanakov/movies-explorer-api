module.exports = class FORBIDDEN_403 extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
    this.statusCode = 403;
  }
};
