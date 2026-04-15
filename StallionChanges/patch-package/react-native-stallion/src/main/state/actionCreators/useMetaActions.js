import { useCallback, useEffect } from 'react';
import { getStallionMetaNative } from '../../utils/StallionNativeUtils';
import { setMeta } from '../actions/metaActions';
const useMetaActions = dispatch => {
  const refreshMeta = useCallback(async () => {
    try {
      const stallionMeta = await getStallionMetaNative();
      dispatch(setMeta(stallionMeta));
    } catch (_) {}
  }, [dispatch]);
  useEffect(() => {
    refreshMeta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    refreshMeta
  };
};
export default useMetaActions;
//# sourceMappingURL=useMetaActions.js.map