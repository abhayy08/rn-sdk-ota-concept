function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { memo, useEffect, useState } from 'react';
import { RefreshControl, FlatList, View } from 'react-native';
import useListing from './hooks/useListing';
import ErrorView from '../../../components/common/ErrorView';
import BucketCard from './components/BucketCard';
import { CARD_TYPES, END_REACH_THRESHOLD, IS_ANDROID } from '../../../constants/appConstants';
import BundleCard from './components/BundleCard';
import FooterLoader from '../../common/FooterLoader';
import styles from './styles';
const BucketOrBundle = /*#__PURE__*/memo(_ref => {
  let {
    data,
    setBucketSelection
  } = _ref;
  return (data === null || data === void 0 ? void 0 : data.type) === CARD_TYPES.BUCKET ? /*#__PURE__*/React.createElement(BucketCard, _extends({
    key: data.id
  }, data, {
    handlePress: () => setBucketSelection(data.id)
  })) : (data === null || data === void 0 ? void 0 : data.type) === CARD_TYPES.BUNDLE && /*#__PURE__*/React.createElement(BundleCard, _extends({
    key: data.id
  }, data)) || null;
});
const Listing = () => {
  const {
    listingData,
    listingLoading,
    listingError,
    fetchListing,
    setBucketSelection,
    fetchNextPage,
    nextPageLoading
  } = useListing();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);
  if (listingError) {
    return /*#__PURE__*/React.createElement(ErrorView, {
      error: listingError,
      onRetry: fetchListing
    });
  }
  if (listingLoading && !listingData.length && !IS_ANDROID) {
    return /*#__PURE__*/React.createElement(FooterLoader, null);
  }
  if (!isMounted) return null;
  return /*#__PURE__*/React.createElement(View, {
    style: styles.flex
  }, /*#__PURE__*/React.createElement(FlatList, {
    style: styles.mainContainer,
    contentContainerStyle: styles.mainListContainer,
    refreshControl: /*#__PURE__*/React.createElement(RefreshControl, {
      refreshing: listingLoading,
      onRefresh: fetchListing
    }),
    data: listingData,
    renderItem: _ref2 => {
      let {
        item
      } = _ref2;
      return /*#__PURE__*/React.createElement(BucketOrBundle, {
        key: item.id,
        data: item,
        setBucketSelection: setBucketSelection
      });
    },
    keyExtractor: item => item.id,
    ListFooterComponent: nextPageLoading ? /*#__PURE__*/React.createElement(FooterLoader, null) : null,
    onEndReached: fetchNextPage,
    onEndReachedThreshold: END_REACH_THRESHOLD
  }));
};
export default /*#__PURE__*/memo(Listing);
//# sourceMappingURL=index.js.map