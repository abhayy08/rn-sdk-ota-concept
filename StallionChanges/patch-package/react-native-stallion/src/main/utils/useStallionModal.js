import { useContext, useCallback } from 'react';
import { GlobalContext } from '../../main/state';
const useStallionModal = () => {
  const {
    actions: {
      setIsModalVisible,
      refreshMeta
    }
  } = useContext(GlobalContext);
  const showModal = useCallback(() => {
    setIsModalVisible(true);
    refreshMeta();
  }, [setIsModalVisible, refreshMeta]);
  return {
    showModal
  };
};
export default useStallionModal;
//# sourceMappingURL=useStallionModal.js.map