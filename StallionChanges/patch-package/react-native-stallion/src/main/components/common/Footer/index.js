import React, { useCallback, memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SWITCH_TEXTS, RESTART_REQUIRED_MESSAGE, FOOTER_SUB_TEXTS } from '../../../constants/appConstants';
import styles from './styles';
import { restart } from '../../../utils/StallionNativeUtils';
const Footer = _ref => {
  let {
    switchIsOn,
    onSwitchToggle,
    errorMessage,
    isRestartRequired
  } = _ref;
  const handleToggle = useCallback(newSwitchStatus => {
    onSwitchToggle === null || onSwitchToggle === void 0 ? void 0 : onSwitchToggle(newSwitchStatus);
  }, [onSwitchToggle]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, errorMessage ? /*#__PURE__*/React.createElement(View, {
    style: [styles.errorInfoSection]
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.ribbonMessage,
    numberOfLines: 1
  }, errorMessage)) : null, isRestartRequired ? /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [styles.restartInfoSection],
    onPress: () => {
      restart === null || restart === void 0 ? void 0 : restart();
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.ribbonMessage,
    numberOfLines: 1
  }, RESTART_REQUIRED_MESSAGE)) : null, /*#__PURE__*/React.createElement(View, {
    style: [styles.footerContainer, styles.shadowContainer]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.switchContainer
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => handleToggle(true),
    style: [styles.tabContainer, switchIsOn ? styles.tabSelected : {}]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.titleBasic, switchIsOn ? styles.titleSelected : {}]
  }, SWITCH_TEXTS.ON), switchIsOn ? /*#__PURE__*/React.createElement(Text, {
    style: [styles.subTitleBasic, switchIsOn ? styles.subTitleSelected : {}]
  }, FOOTER_SUB_TEXTS.STAGE) : null), /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => handleToggle(false),
    style: [styles.tabContainer, !switchIsOn ? styles.tabSelected : {}]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.titleBasic, !switchIsOn ? styles.titleSelected : {}]
  }, SWITCH_TEXTS.OFF), !switchIsOn ? /*#__PURE__*/React.createElement(Text, {
    style: [styles.subTitleBasic, !switchIsOn ? styles.subTitleSelected : {}]
  }, FOOTER_SUB_TEXTS.PROD) : null))));
};
export default /*#__PURE__*/memo(Footer);
//# sourceMappingURL=index.js.map