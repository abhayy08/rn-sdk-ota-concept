import React, { memo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { DOWNLOADING_TEXT } from '../../../constants/appConstants';
import styles from './styles';
const OverlayLoader = _ref => {
  let {
    currentDownloadFraction
  } = _ref;
  return /*#__PURE__*/React.createElement(View, {
    style: styles.loaderContainer
  }, currentDownloadFraction > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
    style: styles.downloadingText
  }, DOWNLOADING_TEXT), /*#__PURE__*/React.createElement(View, {
    style: styles.progressOuter
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.progressInner, {
      width: `${currentDownloadFraction * 100}%`
    }]
  }))) : /*#__PURE__*/React.createElement(ActivityIndicator, {
    color: COLORS.indigo,
    size: 'large'
  }));
};
export default /*#__PURE__*/memo(OverlayLoader);
//# sourceMappingURL=index.js.map