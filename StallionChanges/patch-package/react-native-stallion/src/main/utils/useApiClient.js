import { useCallback } from 'react';
import { API_BASE_URL } from '../constants/apiConstants';
export const useApiClient = (configState, authHandler) => {
  const getData = useCallback((apiPath, apiBody) => {
    const dataRequest = fetch(API_BASE_URL + apiPath, {
      method: 'POST',
      body: JSON.stringify(apiBody),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-app-token': configState.appToken || '',
        'x-sdk-pin-access-token': configState.sdkToken || ''
      }
    });
    if (authHandler) {
      return dataRequest.then(res => {
        if (res.status === 401) {
          authHandler(true);
        }
        return res.json();
      });
    } else return dataRequest.then(res => res.json());
  }, [configState, authHandler]);
  return {
    getData
  };
};
//# sourceMappingURL=useApiClient.js.map