export default class Utility {
  // checking the length of the input and removing the spaces (using trim)
  static isValidField = term => {
    let length = term.trim().length;
    return length > 0 ? true : false;
  };

  // checking the validity of the email
  static isEmailValid = term => {
    const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let isValid = expression.test(String(term).toLowerCase());
    return;
  };
}
