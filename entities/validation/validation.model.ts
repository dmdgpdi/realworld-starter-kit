class ValidationError extends Error {
  isSuccess: boolean;

  errorList: string[];

  constructor(errorList: string[], message: string = '') {
    super(message);
    this.name = 'Validation Error';
    this.isSuccess = false;
    this.errorList = errorList;
  }

  static isValidationError = (error: any): error is ValidationError => {
    return error instanceof ValidationError;
  };
}

export { ValidationError };
