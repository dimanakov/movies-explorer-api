module.exports = class INTERNAL_SERVER_500 extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalServer';
    this.statusCode = 500;
  }
};
