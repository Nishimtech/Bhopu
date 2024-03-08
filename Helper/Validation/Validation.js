import validator from "validator";

class Validation {
  static init(type, value) {
    let isValidate = null;
      switch (type) {
        case "email":
          isValidate = validator.isEmail(value) ? false : true;
          break;
        case 'otp':
          isValidate = value.trim().length >= 4 ? false : true;
          break;
        case "password":
        case "new_password":
        case "confirm_password": 
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        isValidate = value.match(strongRegex)? false : true;
        break;
        case "username":
          isValidate = value.trim().length >= 4? false:true;
          break;
        default:
          break;
      }
    return isValidate;
  }
}

export default Validation
