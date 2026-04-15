import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { DEFAULT_ERROR_PREFIX, RETRY_BUTTON_TEXT } from '../../../constants/appConstants';
const ErrorView = _ref => {
  let {
    error,
    onRetry
  } = _ref;
  return /*#__PURE__*/React.createElement(View, {
    style: styles.errorContainer
  }, error ? /*#__PURE__*/React.createElement(Text, {
    style: styles.errorText
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.boldText
  }, DEFAULT_ERROR_PREFIX), error) : null, onRetry ? /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.retryButtonContainer,
    onPress: onRetry
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.retryText]
  }, RETRY_BUTTON_TEXT)) : null);
};
export default /*#__PURE__*/memo(ErrorView);
//# sourceMappingURL=index.js.map