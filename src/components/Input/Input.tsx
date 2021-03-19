import React, {FC} from 'react';

import {TextInput, TextInputProps, useColorScheme} from 'react-native';

import {styles} from './Input.styles';

type Props = {
  borderless?: boolean;
} & TextInputProps;

const Input: FC<Props> = ({
  onChangeText,
  placeholder,
  borderless,
  value,
  editable,
  keyboardType,
  secureTextEntry,
  autoCapitalize,
}) => {
  const scheme = useColorScheme() || 'light';
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={[styles(scheme).input, borderless ? {} : styles().border]}
      value={value}
      editable={editable}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
    />
  );
};

export default Input;
