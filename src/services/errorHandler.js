import env from '../config/env';

class ErrorHandler {
  constructor() {
    this.errorLog = [];
  }

  logError(error) {
    console.error('Error:', error);
  }

  getErrorLog() {
    return this.errorLog;
  }

  clearErrorLog() {
    this.errorLog = [];
  }
}

export default new ErrorHandler(); 