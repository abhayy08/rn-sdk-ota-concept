import { useCallback, useEffect } from 'react';
import { getStallionConfigNative } from '../../utils/StallionNativeUtils';
import { setConfig } from '../actions/configActions';
const useConfigActions = dispatch => {
  const refreshConfig = useCallback(async () => {
    try {
      const stallionConfig = await getStallionConfigNative();
      dispatch(setConfig(stallionConfig));
    } catch (_) {}
  }, [dispatch]);
  useEffect(() => {
    refreshConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    refreshConfig
  };
};
export default useConfigActions;
//# sourceMappingURL=useConfigActions.js.map