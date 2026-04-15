import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
const ConfigView = _ref => {
  let {
    config
  } = _ref;
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.metaConainer]
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.configCardContainer]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.titleText, styles.bold]
  }, "App Version :"), /*#__PURE__*/React.createElement(View, {
    style: [styles.colContainer, styles.flex]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.subTitleText]
  }, config.appVersion))), /*#__PURE__*/React.createElement(View, {
    style: styles.configCardContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.titleText, styles.bold]
  }, "UID :"), /*#__PURE__*/React.createElement(View, {
    style: [styles.colContainer, styles.flex]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.subTitleText]
  }, config.uid))));
};
export default ConfigView;
//# sourceMappingURL=ConfigView.js.map