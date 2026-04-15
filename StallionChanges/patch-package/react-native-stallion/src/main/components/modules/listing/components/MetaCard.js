import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import CardDescriptionContent from './CardDescriptionContent';
import { parseDateTime } from '../../../../utils/dateUtil';
import styles from './styles';
import { getDigitalStorageSize } from '../../../../utils/getSize';
const MetaCard = _ref => {
  var _meta$sha256Checksum;
  let {
    meta
  } = _ref;
  const updatedAtText = useMemo(() => {
    return parseDateTime(meta.updatedAt);
  }, [meta.updatedAt]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.metaConainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.colContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.titleText, styles.bold]
  }, `v${meta.version}`), /*#__PURE__*/React.createElement(Text, {
    style: [styles.subText]
  }, meta.releaseNote)), /*#__PURE__*/React.createElement(View, {
    style: styles.divider
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.rowContainer
  }, /*#__PURE__*/React.createElement(CardDescriptionContent, {
    title: 'ID',
    subtitle: (_meta$sha256Checksum = meta.sha256Checksum) === null || _meta$sha256Checksum === void 0 ? void 0 : _meta$sha256Checksum.substring(0, 12)
  }), /*#__PURE__*/React.createElement(CardDescriptionContent, {
    title: 'Updated At',
    subtitle: updatedAtText
  }), /*#__PURE__*/React.createElement(CardDescriptionContent, {
    title: 'Size',
    subtitle: getDigitalStorageSize(meta.size || 0)
  })));
};
export default MetaCard;
//# sourceMappingURL=MetaCard.js.map