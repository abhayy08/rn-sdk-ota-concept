import React, { useContext, useMemo, memo } from 'react';
import { View } from 'react-native';
import BundleCardInfoSection from './BundleCardInfoSection';
import styles from './styles';
import { GlobalContext } from '../../../../state';
const BundleCard = _ref => {
  let {
    id,
    version,
    name,
    description,
    updatedAt,
    author,
    downloadUrl
  } = _ref;
  const {
    metaState
  } = useContext(GlobalContext);
  const isApplied = useMemo(() => {
    return metaState.stageSlot.newHash === id;
  }, [metaState.stageSlot.newHash, id]);
  const isDownloaded = useMemo(() => {
    return metaState.stageSlot.tempHash === id;
  }, [metaState.stageSlot.tempHash, id]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.cardContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.infoSection
  }, /*#__PURE__*/React.createElement(BundleCardInfoSection, {
    name: name,
    id: id,
    version: version,
    description: description,
    author: author,
    updatedAt: updatedAt,
    isApplied: isApplied,
    isDownloaded: isDownloaded,
    downloadUrl: downloadUrl
  })));
};
export default /*#__PURE__*/memo(BundleCard);
//# sourceMappingURL=BundleCard.js.map