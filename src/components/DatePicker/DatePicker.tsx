import React, {FC} from 'react';

import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import {styles} from './DatePicker.styles';

type Props = {
  onChangeText: (event: Event, value?: Date) => void;
  placeholder: string;
  value: string;
  onPress?: () => void;
  name: string;
};

const DatePicker: FC<Props> = ({onChangeText, placeholder, value, onPress}) => {
  const scheme = useColorScheme() || 'light';
  return (
    <View style={styles().container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles(scheme).control}>
          <Text style={styles(scheme).text}>{placeholder}</Text>
          <TextInput
            style={[styles(scheme).text, styles(scheme).value]}
            editable={false}
            value={format(new Date(value), 'MMM d, yyyy')}
          />
        </View>
      </TouchableOpacity>
      <DateTimePicker
        value={new Date(value)}
        mode="date"
        display="inline"
        onChange={onChangeText}
      />
    </View>
  );
};

export default DatePicker;
