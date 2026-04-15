import React, { memo, useCallback, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { STALLION_LOGO_URL } from '../../../constants/appConstants';
import styles from './styles';
import BackButton from '../BackButton';
import CrossButton from '../CrossButton';
const Header = _ref => {
  let {
    title,
    onBackPress,
    onClosePress
  } = _ref;
  const [errorLogoLoading, setErrorLogoLoading] = useState(false);
  const errorInLogoLoading = useCallback(() => {
    setErrorLogoLoading(true);
  }, []);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.headerContainer
  }, onBackPress ? /*#__PURE__*/React.createElement(View, {
    style: [styles.headerSideSection, styles.alignStart]
  }, /*#__PURE__*/React.createElement(BackButton, {
    onPress: onBackPress
  })) : /*#__PURE__*/React.createElement(View, {
    style: [styles.headerSideSection, styles.alignStart]
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.headerCenterSection
  }, title ? errorLogoLoading ? /*#__PURE__*/React.createElement(Text, {
    style: styles.headerText
  }, title) : /*#__PURE__*/React.createElement(Image, {
    source: {
      uri: STALLION_LOGO_URL
    },
    style: styles.headerLogo,
    resizeMode: "contain",
    onError: errorInLogoLoading
  }) : null), onClosePress ? /*#__PURE__*/React.createElement(View, {
    style: styles.headerSideSection
  }, /*#__PURE__*/React.createElement(CrossButton, {
    onPress: onClosePress
  })) : /*#__PURE__*/React.createElement(View, {
    style: styles.headerSideSection
  }));
};
export default /*#__PURE__*/memo(Header);
//# sourceMappingURL=index.js.map