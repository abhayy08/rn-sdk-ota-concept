import React from 'react';
const withStallion = BaseComponent => {
  const StallionProvider = _ref => {
    let {
      children,
      ...props
    } = _ref;
    return /*#__PURE__*/React.createElement(BaseComponent, props, children);
  };
  return StallionProvider;
};
export default withStallion;
//# sourceMappingURL=withStallion.js.map