import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { HEADER_SLAB_HEIGHT } from '../../../constants/appConstants';
export const BUTTON_SIZE = HEADER_SLAB_HEIGHT / 2.5; // Change this to scale button

const CrossButton = _ref => {
  let {
    onPress,
    size = BUTTON_SIZE
  } = _ref;
  const strokeStyle = {
    position: 'absolute',
    width: size,
    height: 3,
    backgroundColor: COLORS.black7
  };
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPress,
    style: [styles.container, {
      width: size,
      height: size
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: [strokeStyle, {
      transform: [{
        rotate: '45deg'
      }]
    }]
  }), /*#__PURE__*/React.createElement(View, {
    style: [strokeStyle, {
      transform: [{
        rotate: '-45deg'
      }]
    }]
  }));
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default CrossButton;
//# sourceMappingURL=index.js.map