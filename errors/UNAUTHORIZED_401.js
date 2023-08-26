module.exports = class UNAUTHORIZED_404 extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
    this.statusCode = 401;
  }
};
