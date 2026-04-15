import { DEFAULT_ERROR_MESSAGE } from '../constants/appConstants';
export const extractError = errorObject => {
  var _errorObject$errors;
  const errorArray = errorObject === null || errorObject === void 0 ? void 0 : (_errorObject$errors = errorObject.errors) === null || _errorObject$errors === void 0 ? void 0 : _errorObject$errors.data;
  if (errorArray) {
    var _errorArray$map;
    return ((_errorArray$map = errorArray.map(errMsgObject => (errMsgObject === null || errMsgObject === void 0 ? void 0 : errMsgObject.message) || '')) === null || _errorArray$map === void 0 ? void 0 : _errorArray$map.join(', ')) || DEFAULT_ERROR_MESSAGE;
  } else return DEFAULT_ERROR_MESSAGE;
};
//# sourceMappingURL=errorUtil.js.map