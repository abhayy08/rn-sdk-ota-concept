import { useCallback } from 'react';
import { DEFAULT_ERROR_MESSAGE } from '../../constants/appConstants';
import { extractError } from '../../utils/errorUtil';
import { setUserError } from '../../state/actions/userActions';
import { setUserLoading } from '../../state/actions/userActions';
import { useApiClient } from '../../utils/useApiClient';
import { API_PATHS } from '../../constants/apiConstants';
import { setSdkTokenNative } from '../../utils/StallionNativeUtils';
const useUserActions = (dispatch, refreshConfig, configState) => {
  const {
    getData
  } = useApiClient(configState);
  const clearUserLogin = shouldClearLogin => {
    if (shouldClearLogin) {
      setSdkTokenNative('').then(() => {
        refreshConfig();
      });
    }
  };
  const loginUser = useCallback(loginPayload => {
    dispatch(setUserLoading());
    getData(API_PATHS.LOGIN, {
      ...loginPayload,
      projectId: configState.projectId
    }).then(loginResponse => {
      var _loginResponse$data;
      const sdkToken = loginResponse === null || loginResponse === void 0 ? void 0 : (_loginResponse$data = loginResponse.data) === null || _loginResponse$data === void 0 ? void 0 : _loginResponse$data.token;
      if (sdkToken) {
        setSdkTokenNative(sdkToken).then(() => {
          refreshConfig();
        });
      } else {
        dispatch(setUserError(extractError(loginResponse)));
      }
    }).catch(_ => {
      dispatch(setUserError(DEFAULT_ERROR_MESSAGE));
    });
  }, [dispatch, configState, getData, refreshConfig]);
  return {
    loginUser,
    clearUserLogin
  };
};
export default useUserActions;
//# sourceMappingURL=useUserActions.js.map