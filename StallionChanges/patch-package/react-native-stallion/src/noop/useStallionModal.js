import { useCallback } from 'react';
import { STALLION_DISABLED_ERROR } from '../StallionNativeModule';
const useStallionModal = () => {
  const showModal = useCallback(() => {
    console.error(STALLION_DISABLED_ERROR);
  }, []);
  return {
    showModal
  };
};
export default useStallionModal;
//# sourceMappingURL=useStallionModal.js.map