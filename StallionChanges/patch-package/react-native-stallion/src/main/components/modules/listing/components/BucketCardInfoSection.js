import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import CardDescriptionContent from './CardDescriptionContent';
import { parseDateTime } from '../../../../utils/dateUtil';
import { COLORS } from '../../../../constants/colors';
import { BUCKET_CARD_TEXTS, NOT_APPLICABLE_TEXT, VERSION_PREFIX } from '../../../../constants/appConstants';
import styles from './styles';
const BucketCardInfoSection = _ref => {
  let {
    name,
    updatedAt,
    bundleCount,
    isApplied,
    switchState
  } = _ref;
  const renderStateText = useMemo(() => {
    if (isApplied && !switchState) return {
      text: BUCKET_CARD_TEXTS.DOWNLOADED,
      color: COLORS.orange
    };
    if (isApplied && switchState) return {
      text: BUCKET_CARD_TEXTS.APPLIED,
      color: COLORS.green
    };
    return null;
  }, [isApplied, switchState]);
  const updatedAtText = useMemo(() => {
    return parseDateTime(updatedAt);
  }, [updatedAt]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.rowContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.titleText, styles.bold]
  }, name), /*#__PURE__*/React.createElement(Text, {
    style: [styles.appliedText, {
      color: renderStateText === null || renderStateText === void 0 ? void 0 : renderStateText.color
    }]
  }, renderStateText === null || renderStateText === void 0 ? void 0 : renderStateText.text)), /*#__PURE__*/React.createElement(View, {
    style: styles.divider
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.rowContainer
  }, /*#__PURE__*/React.createElement(CardDescriptionContent, {
    title: BUCKET_CARD_TEXTS.VERSION,
    subtitle: bundleCount && +bundleCount ? `${VERSION_PREFIX}${bundleCount}` : NOT_APPLICABLE_TEXT
  }), /*#__PURE__*/React.createElement(CardDescriptionContent, {
    title: BUCKET_CARD_TEXTS.BUNDLES,
    subtitle: bundleCount && +bundleCount ? bundleCount : 0
  }), /*#__PURE__*/React.createElement(CardDescriptionContent, {
    title: BUCKET_CARD_TEXTS.UPDATED,
    subtitle: updatedAtText
  })));
};
export default BucketCardInfoSection;
//# sourceMappingURL=BucketCardInfoSection.js.map