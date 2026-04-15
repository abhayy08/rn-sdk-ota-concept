import React, { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from './styles';
import { GlobalContext } from '../../../state';
import MetaCard from '../listing/components/MetaCard';
import ConfigView from '../listing/components/ConfigView';
const Prod = () => {
  const {
    updateMetaState,
    configState
  } = useContext(GlobalContext);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: styles.pageContainer,
    showsVerticalScrollIndicator: false
  }, /*#__PURE__*/React.createElement(ConfigView, {
    config: configState
  }), updateMetaState.currentlyRunningBundle && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
    style: styles.cardTitle
  }, "Currently Active Bundle"), /*#__PURE__*/React.createElement(MetaCard, {
    meta: updateMetaState.currentlyRunningBundle
  })), updateMetaState.newBundle && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
    style: styles.cardTitle
  }, "New Bundle"), /*#__PURE__*/React.createElement(MetaCard, {
    meta: updateMetaState.newBundle
  }))));
};
export default Prod;
//# sourceMappingURL=prod.js.map