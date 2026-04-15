import React, { useContext } from 'react';
import { Modal, SafeAreaView, StyleSheet, View } from 'react-native';
import Login from '../login';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import { HEADER_TITLE } from '../../../constants/appConstants';
import { COLORS } from '../../../constants/colors';
import Listing from '../listing';
import useStallionModal from './hooks/useStallionModal';
import OverlayLoader from '../../../components/common/OverlayLoader';
import { SWITCH_STATES } from '../../../../types/meta.types';
import Prod from '../prod';
import { GlobalContext } from '../../../state';
const StallionModal = () => {
  const {
    isModalVisible,
    actions: {
      setIsModalVisible
    }
  } = useContext(GlobalContext);
  return /*#__PURE__*/React.createElement(Modal, {
    transparent: true,
    animationType: "slide",
    visible: isModalVisible,
    onRequestClose: () => setIsModalVisible(false)
  }, isModalVisible ? /*#__PURE__*/React.createElement(Content, null) : null);
};
const Content = () => {
  const {
    onBackPress,
    onClosePress,
    loginRequired,
    isBackEnabled,
    isDownloading,
    downloadProgress,
    metaState,
    downloadError,
    handleSwitch,
    internalIsRestartRequired
  } = useStallionModal();
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Header, {
    title: loginRequired ? null : HEADER_TITLE,
    onClosePress: onClosePress,
    onBackPress: isBackEnabled ? onBackPress : null
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.listingSection
  }, loginRequired ? /*#__PURE__*/React.createElement(Login, null) : metaState.switchState === SWITCH_STATES.STAGE ? /*#__PURE__*/React.createElement(Listing, null) : /*#__PURE__*/React.createElement(Prod, null), isDownloading && /*#__PURE__*/React.createElement(OverlayLoader, {
    currentDownloadFraction: downloadProgress
  })), loginRequired ? null : /*#__PURE__*/React.createElement(Footer, {
    switchIsOn: metaState.switchState === SWITCH_STATES.STAGE,
    onSwitchToggle: handleSwitch,
    errorMessage: downloadError,
    isRestartRequired: internalIsRestartRequired
  }));
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    backgroundColor: COLORS.white
  },
  listingSection: {
    flex: 1
  }
});
export default StallionModal;
//# sourceMappingURL=StallionModal.js.map