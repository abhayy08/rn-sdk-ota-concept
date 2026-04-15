import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import Header from '../components/common/Header';
import ButtonFullWidth from '../components/common/ButtonFullWidth';
import { getStallionMetaNative } from './StallionNativeUtils';
import { setCrashOccurred } from './crashState';
import { HEADER_TITLE, STALLION_EB_BTN_TXT, STALLION_EB_INFO, STD_MARGIN } from '../constants/appConstants';
import { COLORS } from '../constants/colors';
import { SWITCH_STATES } from '../../types/meta.types';
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorText: null,
      originalError: null
    };
    this.continueCrash = this.continueCrash.bind(this);
  }
  async componentDidCatch(error, errorInfo) {
    // Build comprehensive error string
    const errorParts = [];
    if (error.name) {
      errorParts.push(`Error Name: ${error.name}`);
    }
    if (error.message) {
      errorParts.push(`Message: ${error.message}`);
    }
    if (error.cause) {
      errorParts.push(`Cause: ${String(error.cause)}`);
    }
    if (error.stack) {
      errorParts.push(`\nStack Trace:\n${error.stack}`);
    }
    if (errorInfo !== null && errorInfo !== void 0 && errorInfo.componentStack) {
      errorParts.push(`\nComponent Stack:\n${errorInfo.componentStack}`);
    }
    const errorString = errorParts.length > 0 ? errorParts.join('\n\n') : `Unknown error: ${String(error)}`;
    console.error('Exception occurred in JS layer:', error);
    console.error('Error Info:', errorInfo);

    // Mark that a crash has occurred
    setCrashOccurred();

    // Get meta to determine behavior
    const meta = await getStallionMetaNative();

    // In production, re-throw after a brief delay to allow state update
    if (meta.switchState !== SWITCH_STATES.STAGE) {
      requestAnimationFrame(() => {
        throw error;
      });
    } else {
      // Store both error string and original error for STAGE mode
      this.setState({
        errorText: errorString,
        originalError: error
      });
    }
  }
  continueCrash() {
    // Re-throw original error if available to preserve full context (stack trace, name, etc.)
    // Fallback to new error with error text if original is not available
    if (this.state.originalError) {
      throw this.state.originalError;
    } else {
      throw new Error(this.state.errorText || '');
    }
  }
  render() {
    if (this.state.errorText) {
      return /*#__PURE__*/React.createElement(SafeAreaView, {
        style: styles.ebContainer
      }, /*#__PURE__*/React.createElement(Header, {
        title: HEADER_TITLE
      }), /*#__PURE__*/React.createElement(View, {
        style: styles.ebContentContainer
      }, /*#__PURE__*/React.createElement(View, {
        style: styles.ebInfoTextContainer
      }, /*#__PURE__*/React.createElement(Text, {
        style: styles.ebInfoText
      }, STALLION_EB_INFO), /*#__PURE__*/React.createElement(ButtonFullWidth, {
        buttonText: STALLION_EB_BTN_TXT,
        onPress: this.continueCrash
      })), /*#__PURE__*/React.createElement(ScrollView, {
        style: styles.ebScrollContainer,
        contentContainerStyle: styles.ebScrollContentContainer
      }, /*#__PURE__*/React.createElement(Text, {
        style: styles.ebErrorText
      }, this.state.errorText))));
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
const styles = StyleSheet.create({
  ebContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  ebContentContainer: {
    flex: 1,
    paddingHorizontal: STD_MARGIN,
    width: '100%'
  },
  ebInfoTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: STD_MARGIN
  },
  ebScrollContentContainer: {
    flexGrow: 1
  },
  ebInfoText: {
    textAlign: 'center',
    marginVertical: STD_MARGIN
  },
  ebScrollContainer: {
    flex: 1,
    backgroundColor: COLORS.black7
  },
  ebErrorText: {
    color: COLORS.white
  }
});
//# sourceMappingURL=ErrorBoundary.js.map