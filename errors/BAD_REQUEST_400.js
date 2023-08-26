module.exports = class BAD_REQUEST_400 extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequest';
    this.statusCode = 400;
  }
};
