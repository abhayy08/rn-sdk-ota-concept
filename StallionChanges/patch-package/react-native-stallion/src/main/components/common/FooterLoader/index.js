import React, { memo } from 'react';
import { View } from 'react-native';
import Spinner from '../Spinner';
import styles from './styles';
const FooterLoader = () => {
  return /*#__PURE__*/React.createElement(View, {
    style: styles.loaderContainer
  }, /*#__PURE__*/React.createElement(Spinner, null));
};
export default /*#__PURE__*/memo(FooterLoader);
//# sourceMappingURL=index.js.map