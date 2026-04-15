import React, { memo, useContext, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../../../../state';
import BucketCardInfoSection from './BucketCardInfoSection';
import styles from './styles';
import { SWITCH_STATES } from '../../../../../types/meta.types';
const BucketCard = _ref => {
  let {
    name,
    updatedAt,
    bundleCount,
    handlePress
  } = _ref;
  const {
    metaState
  } = useContext(GlobalContext);
  const isApplied = useMemo(() => false, []);
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.cardContainer,
    onPress: handlePress,
    activeOpacity: 0.5
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.infoSection
  }, /*#__PURE__*/React.createElement(BucketCardInfoSection, {
    name: name,
    updatedAt: updatedAt,
    bundleCount: bundleCount === null || bundleCount === void 0 ? void 0 : bundleCount.toString(),
    isApplied: isApplied,
    switchState: (metaState === null || metaState === void 0 ? void 0 : metaState.switchState) === SWITCH_STATES.STAGE
  })));
};
export default /*#__PURE__*/memo(BucketCard);
//# sourceMappingURL=BucketCard.js.map