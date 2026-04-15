import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../../../constants/colors';
import { STD_MARGIN } from '../../../../constants/appConstants';
const CardDescriptionContent = _ref => {
  let {
    title,
    subtitle
  } = _ref;
  return /*#__PURE__*/React.createElement(View, {
    style: styles.centerContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.title
  }, title), /*#__PURE__*/React.createElement(Text, {
    style: styles.subtitle
  }, subtitle));
};
const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: STD_MARGIN * 1.3,
    fontWeight: '500',
    color: COLORS.black7
  },
  subtitle: {
    fontSize: STD_MARGIN * 1.1,
    fontWeight: '600',
    marginTop: 5,
    color: COLORS.black
  }
});
export default CardDescriptionContent;
//# sourceMappingURL=CardDescriptionContent.js.map