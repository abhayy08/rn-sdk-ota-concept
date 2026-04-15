import React from 'react';
import GlobalProvider from '../state';
import ErrorBoundary from './ErrorBoundary';
import StallionModal from '../components/modules/modal/StallionModal';
const withStallion = (BaseComponent, initPrams) => {
  const StallionProvider = _ref => {
    let {
      children,
      ...props
    } = _ref;
    return /*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(GlobalProvider, {
      stallionInitParams: initPrams
    }, /*#__PURE__*/React.createElement(BaseComponent, props, children), /*#__PURE__*/React.createElement(StallionModal, null)));
  };
  return StallionProvider;
};
export default withStallion;
//# sourceMappingURL=withStallion.js.map