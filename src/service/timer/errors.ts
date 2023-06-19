export class InvalidConstructorCallError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidConstructorCallError';
  }
}

export class InvalidOperationError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidOperationError';
  }
}

export class UnexpectedError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'UnexpectedError';
  }
}
