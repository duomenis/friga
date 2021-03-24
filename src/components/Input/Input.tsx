import React, {FC} from 'react';

import {TextInput, TextInputProps, useColorScheme} from 'react-native';

import {styles} from './Input.styles';

type Props = TextInputProps;

const Input: FC<Props> = ({
  onChangeText,
  placeholder,
  value,
  editable,
  keyboardType,
  secureTextEntry,
  autoCapitalize,
  autoFocus,
}) => {
  const scheme = useColorScheme() || 'light';
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={styles(scheme).input}
      value={value}
      editable={editable}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      autoFocus={autoFocus}
    />
  );
};

export default Input;
