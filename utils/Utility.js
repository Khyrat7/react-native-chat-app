export default class Utility {
  // checking the length of the input and removing the spaces (using trim)
  static isValidField = term => {
    let length = term.trim().length;
    return length > 0 ? true : false;
  };

  // checking the validity of the email
  static isEmailValid = term => {
    const expression = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let isValid = expression.test(String(term).toLowerCase());
    return isValid;
  };
}
