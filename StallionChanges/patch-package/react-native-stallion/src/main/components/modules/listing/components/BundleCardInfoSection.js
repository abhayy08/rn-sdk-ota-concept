import React, { useCallback, useContext, useMemo, memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GlobalContext } from '../../../../state';
import CardDescriptionContent from './CardDescriptionContent';
import { parseDateTime } from '../../../../utils/dateUtil';
import { APPLIED_TEXT, BUCKET_CARD_TEXTS, BUNDLE_APPLIED_TEXT, BUNDLE_CARD_AUTHOR, BUNDLE_CARD_RELEASE_NOTE, DOWNLOADED_TEXT, DOWNLOAD_BUTTON_TEXT, NO_RELEASE_NOTE_TEXT, SWITCH_STATE_KEYS } from '../../../../constants/appConstants';
import { COLORS } from '../../../../constants/colors';
import styles from './styles';
const BundleCardInfoSection = _ref => {
  let {
    id,
    version,
    description,
    updatedAt,
    author,
    isApplied,
    isDownloaded,
    downloadUrl
  } = _ref;
  const {
    bundleState: {
      selectedBucketId
    },
    actions: {
      downloadBundle
    }
  } = useContext(GlobalContext);
  const stateColor = useMemo(() => {
    if (isApplied) return COLORS.indigo;
    if (isDownloaded) return COLORS.green;
    return COLORS.white;
  }, [isApplied, isDownloaded]);
  const updatedAtText = useMemo(() => {
    return parseDateTime(updatedAt);
  }, [updatedAt]);
  const handleDownloadPress = useCallback(() => {
    if (!isApplied && selectedBucketId && version) {
      downloadBundle(downloadUrl, id);
    }
  }, [isApplied, selectedBucketId, version, downloadBundle, downloadUrl, id]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.rowContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.titleText, styles.bold]
  }, "v", version), /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: handleDownloadPress,
    disabled: isApplied || isDownloaded,
    style: [styles.downloadButton, {
      backgroundColor: isApplied || isDownloaded ? 'transparent' : COLORS.black
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.appliedText, {
      color: stateColor
    }]
  }, isApplied ? APPLIED_TEXT : isDownloaded ? DOWNLOADED_TEXT : DOWNLOAD_BUTTON_TEXT))), description ? /*#__PURE__*/React.createElement(View, {
    style: styles.descContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.releaseNoteText
  }, BUNDLE_CARD_RELEASE_NOTE), /*#__PURE__*/React.createElement(Text, {
    numberOfLines: 2,
    style: styles.releaseNoteDescriptionText
  }, description)) : /*#__PURE__*/React.createElement(Text, {
    style: styles.releaseNoteText
  }, NO_RELEASE_NOTE_TEXT), /*#__PURE__*/React.createElement(View, {
    style: styles.divider
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.rowContainer
  }, /*#__PURE__*/React.createElement(CardDescriptionContent, {
    title: BUNDLE_CARD_AUTHOR,
    subtitle: author ?? ''
  }), /*#__PURE__*/React.createElement(CardDescriptionContent, {
    title: BUNDLE_APPLIED_TEXT,
    subtitle: isApplied ? SWITCH_STATE_KEYS.Enabled : SWITCH_STATE_KEYS.Disabled
  }), /*#__PURE__*/React.createElement(CardDescriptionContent, {
    title: BUCKET_CARD_TEXTS.UPDATED,
    subtitle: updatedAtText
  })));
};
export default /*#__PURE__*/memo(BundleCardInfoSection);
//# sourceMappingURL=BundleCardInfoSection.js.map