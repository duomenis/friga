import React, {FC} from 'react';
import {
  View,
  Text,
  useColorScheme,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  TouchableOpacity,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {format} from 'date-fns';
import nodeEmoji from 'node-emoji';

import {RootStackParamList, Icon} from '../../types';
import DatePicker from '../DatePicker';
import Input from '../Input';
import {styles} from './EventForm.styles';
import colors from '../../constants/colors';

type ViewProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  name: string;
  icon?: string;
  date: string;
  onNameChange: (name: string) => void;
  onDateChange: (date: string) => void;
  onIconChange: ({value}: {value: Icon}) => void;
  isEdit?: boolean;
  onDelete?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
};

const EventForm: FC<ViewProps> = ({
  name,
  icon,
  date,
  navigation,
  onDateChange,
  onNameChange,
  onIconChange,
  isEdit,
  onDelete,
}) => {
  const scheme = useColorScheme() || 'light';
  return (
    <View style={styles().container}>
      <View style={styles(scheme).formSection}>
        <Input placeholder="Name" value={name} onChangeText={onNameChange} />
      </View>
      <View style={styles(scheme).formSection}>
        <TouchableOpacity
          style={styles(scheme).iconContainer}
          onPress={() =>
            navigation.navigate('EmojiPicker', {onSelect: onIconChange})
          }>
          <Text style={styles(scheme).iconPickerText}>Icon</Text>
          <Text style={styles().emoji}>
            {nodeEmoji.get(icon || 'hourglass_flowing_sand')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles(scheme).formSection}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <DatePicker
            name="datePicker"
            value={date}
            placeholder="Date"
            onPress={() => null}
            onChangeText={(_, selectedDate) =>
              selectedDate && onDateChange(format(selectedDate, 'yyyy/MM/dd'))
            }
          />
        </TouchableWithoutFeedback>
      </View>
      {isEdit && onDelete && (
        <View style={styles(scheme).formSection}>
          <Button
            color={colors.deleteActionBackground}
            onPress={onDelete}
            title="Delete Event"
          />
        </View>
      )}
    </View>
  );
};

export default EventForm;
