import React, { useState, useCallback, useContext } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput } from 'react-native';
import { KEYBOARD_AVOIDING_BEHAVIOUR, Login_TITLE, PIN_LENGTH, PIN_INPUT_KEY, SUBMIT_BUTTON_TEXT } from '../../../constants/appConstants';
import styles from './styles';
import Spinner from '../../common/Spinner';
import { COLORS } from '../../../constants/colors';
import ButtonFullWidth from '../../common/ButtonFullWidth';
import { GlobalContext } from '../../../../main/state';
const Login = () => {
  const {
    userState,
    actions: {
      loginUser
    }
  } = useContext(GlobalContext);
  const [pin, setPin] = useState('');
  const handleNumberFormating = useCallback(e => {
    try {
      const text = e.nativeEvent.text;
      setPin(text.replace(/[^0-9]/g, ''));
    } catch (_) {}
  }, [setPin]);
  const handleSubmitClick = useCallback(() => {
    if (pin.length === PIN_LENGTH) {
      loginUser({
        pin
      });
    }
  }, [loginUser, pin]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.pageContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.logoContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.logoText
  }, Login_TITLE)), /*#__PURE__*/React.createElement(KeyboardAvoidingView, {
    behavior: KEYBOARD_AVOIDING_BEHAVIOUR,
    style: styles.inputSection
  }, /*#__PURE__*/React.createElement(TextInput, {
    style: styles.textInp,
    placeholder: PIN_INPUT_KEY,
    placeholderTextColor: COLORS.black5,
    value: pin,
    onChange: handleNumberFormating,
    maxLength: PIN_LENGTH,
    keyboardType: "numeric",
    autoFocus: false
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/React.createElement(ButtonFullWidth, {
    onPress: handleSubmitClick,
    buttonText: SUBMIT_BUTTON_TEXT,
    enabled: !userState.isLoading && (pin === null || pin === void 0 ? void 0 : pin.length) === PIN_LENGTH
  })), userState.isLoading && /*#__PURE__*/React.createElement(View, {
    style: styles.spinnerContainer
  }, /*#__PURE__*/React.createElement(Spinner, null)), userState.error && /*#__PURE__*/React.createElement(Text, {
    style: styles.errorText
  }, userState.error));
};
export default Login;
//# sourceMappingURL=index.js.map