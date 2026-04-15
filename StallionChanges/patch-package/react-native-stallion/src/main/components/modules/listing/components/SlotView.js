import { StyleSheet, View } from 'react-native';
import React from 'react';
import { SLOT_STATES } from '../../../../../types/meta.types';
import { NATIVE_CONSTANTS, STD_MARGIN } from '../../../../constants/appConstants';
import { COLORS } from '../../../../constants/colors';
function getSlotColor(slot) {
  switch (slot) {
    case NATIVE_CONSTANTS.DEFAULT_FOLDER_SLOT:
      return '#9CA3AF';
    case NATIVE_CONSTANTS.STABLE_FOLDER_SLOT:
      return '#F59E0B';
    case NATIVE_CONSTANTS.NEW_FOLDER_SLOT:
      return COLORS.indigo;
    case NATIVE_CONSTANTS.TEMP_FOLDER_SLOT:
      return COLORS.green;
  }
}
const StallionSlot = _ref => {
  let {
    slot,
    isActive
  } = _ref;
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.slotItem, {
      backgroundColor: getSlotColor(slot),
      borderWidth: isActive ? 1 : 0
    }]
  });
};
const SlotView = props => {
  const {
    currentSlot,
    tempHash,
    stableHash,
    newHash
  } = props;
  const activeSlot = currentSlot;
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.parentContainer, styles.rowContainer]
  }, /*#__PURE__*/React.createElement(StallionSlot, {
    slot: NATIVE_CONSTANTS.DEFAULT_FOLDER_SLOT,
    hash: '',
    isActive: activeSlot === SLOT_STATES.DEFAULT
  }), stableHash ? /*#__PURE__*/React.createElement(StallionSlot, {
    slot: NATIVE_CONSTANTS.STABLE_FOLDER_SLOT,
    hash: stableHash || '',
    isActive: activeSlot === SLOT_STATES.STABLE
  }) : null, newHash ? /*#__PURE__*/React.createElement(StallionSlot, {
    slot: NATIVE_CONSTANTS.NEW_FOLDER_SLOT,
    hash: newHash || '',
    isActive: activeSlot === SLOT_STATES.NEW
  }) : null, tempHash ? /*#__PURE__*/React.createElement(StallionSlot, {
    slot: NATIVE_CONSTANTS.TEMP_FOLDER_SLOT,
    hash: tempHash || '',
    isActive: false
  }) : null);
};
const styles = StyleSheet.create({
  parentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingRight: STD_MARGIN,
    paddingVertical: STD_MARGIN,
    backgroundColor: COLORS.white
  },
  rowContainer: {
    flexDirection: 'row'
  },
  slotItem: {
    flex: 1,
    width: '100%',
    height: STD_MARGIN,
    marginLeft: STD_MARGIN,
    borderRadius: STD_MARGIN / 2
  }
});
export default SlotView;
//# sourceMappingURL=SlotView.js.map