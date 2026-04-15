import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';
const ButtonFullWidth = _ref => {
  let {
    buttonText,
    primary = true,
    onPress,
    enabled = true
  } = _ref;
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [styles.buttonContainer, primary ? styles.primaryButton : styles.transparentButton, enabled ? null : styles.disabled],
    onPress: onPress,
    disabled: !enabled
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.buttonText, primary ? styles.primaryText : styles.secondaryText]
  }, buttonText));
};
export default /*#__PURE__*/memo(ButtonFullWidth);
//# sourceMappingURL=index.js.map