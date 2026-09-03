export class DomainError extends Error {
  constructor(message, code) {
    if (new.target === DomainError) {
      throw new TypeError('DomainError is abstract and cannot be instantiated directly');
    }
    super(message);
    this.name = new.target.name;
    this.code = code;
  }
}
