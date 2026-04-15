import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';
import { COLORS } from '../../../constants/colors';
const Spinner = () => {
  return /*#__PURE__*/React.createElement(ActivityIndicator, {
    size: 'large',
    color: COLORS.black
  });
};
export default /*#__PURE__*/memo(Spinner);
//# sourceMappingURL=index.js.map