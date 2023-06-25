export class InvalidPomoStateError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidPomoStateError';
  }
}

export class InvalidTimeValueSettingError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'InvalidTimeValueSettingError';
  }
}
