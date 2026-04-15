import React, { createContext, useReducer, useState } from 'react';
import metaReducer from './reducers/metaReducer';
import userReducer from './reducers/userReducer';
import bucketReducer from './reducers/bucketReducer';
import bundleReducer from './reducers/bundleReducer';
import downloadReducer from './reducers/downloadReducer';
import useBucketActions from './actionCreators/useBucketActions';
import useMetaActions from './actionCreators/useMetaActions';
import useBundleActions from './actionCreators/useBundleActions';
import useUserActions from './actionCreators/useUserActions';
import useUpdateMetaActions from './actionCreators/useUpdateMetaActions';
import { EMPTY_STATE } from '../constants/appConstants';
import useDownloadActions from './actionCreators/useDownloadActions';
import updateMetaReducer from './reducers/updateMetaReducer';
import configReducer from './reducers/configReducer';
import useConfigActions from './actionCreators/useConfigActions';
import { useStallionEvents } from './useStallionEvents';
export const GlobalContext = /*#__PURE__*/createContext({});
const GlobalProvider = _ref => {
  let {
    children,
    stallionInitParams
  } = _ref;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [metaState, metaDispatch] = useReducer(metaReducer, {});
  const [configState, configDispatch] = useReducer(configReducer, {});
  const [userState, userDispatch] = useReducer(userReducer, EMPTY_STATE);
  const [bucketState, bucketDispatch] = useReducer(bucketReducer, EMPTY_STATE);
  const [bundleState, bundleDispatch] = useReducer(bundleReducer, EMPTY_STATE);
  const [downloadState, downloadDispatch] = useReducer(downloadReducer, {});
  const [updateMetaState, updateMetaDispatch] = useReducer(updateMetaReducer, {
    currentlyRunningBundle: null,
    newBundle: null,
    initialProdSlot: null,
    pendingReleaseHash: null
  });
  useUpdateMetaActions(updateMetaState, metaState, updateMetaDispatch, configState);
  const {
    refreshMeta
  } = useMetaActions(metaDispatch);
  const {
    refreshConfig
  } = useConfigActions(configDispatch);
  const {
    loginUser,
    clearUserLogin
  } = useUserActions(userDispatch, refreshConfig, configState);
  const {
    fetchBuckets
  } = useBucketActions(bucketDispatch, clearUserLogin, configState);
  const {
    fetchBundles,
    selectBucket
  } = useBundleActions(bundleDispatch, bundleState, clearUserLogin, configState);
  const {
    downloadBundle,
    setProgress,
    setDownloadErrorMessage
  } = useDownloadActions(downloadDispatch, refreshMeta, configState);
  useStallionEvents(refreshMeta, setProgress, configState, updateMetaDispatch, stallionInitParams);
  const value = {
    isModalVisible,
    metaState,
    userState,
    bucketState,
    bundleState,
    downloadState,
    updateMetaState,
    configState,
    actions: {
      loginUser,
      setIsModalVisible,
      fetchBuckets,
      clearUserLogin,
      refreshMeta,
      fetchBundles,
      selectBucket,
      downloadBundle,
      setProgress,
      setDownloadErrorMessage,
      refreshConfig
    }
  };
  return /*#__PURE__*/React.createElement(GlobalContext.Provider, {
    value: value
  }, children);
};
export default GlobalProvider;
//# sourceMappingURL=index.js.map