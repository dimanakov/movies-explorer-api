module.exports = class CONFLICT_409 extends Error {
  constructor(message) {
    super(message);
    this.name = 'Conflict';
    this.statusCode = 409;
  }
};
