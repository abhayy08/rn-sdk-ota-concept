import { UserActionKind } from '../../../types/user.types';
export const setUserLoading = () => {
  return {
    type: UserActionKind.SET_USER_LOADING
  };
};
export const setUserError = userErrorString => {
  return {
    type: UserActionKind.SET_USER_ERROR,
    payload: userErrorString
  };
};
//# sourceMappingURL=userActions.js.map