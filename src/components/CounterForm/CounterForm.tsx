import React, {FC} from 'react';
import {View, Text, useColorScheme} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {format} from 'date-fns';
import nodeEmoji from 'node-emoji';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RouteProp} from '@react-navigation/native';

import {RootStackParamList} from '../../types';
import DatePicker from '../../components/DatePicker';
import Input from '../../components/Input';
import {styles} from './CounterForm.styles';

type ListRouteProp = RouteProp<RootStackParamList, 'CreateCounter'>;

type ViewProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  //route: ListRouteProp;
  name: string;
  icon?: string;
  date: string;
  onNameChange: (name: string) => void;
  onDateChange: (date: string) => void;
};

const CounterForm: FC<ViewProps> = ({
  name,
  icon,
  date,
  navigation,
  onDateChange,
  onNameChange,
}) => {
  const scheme = useColorScheme() || 'light';
  return (
    <View style={styles().container}>
      <TouchableOpacity
        style={styles(scheme).icon}
        onPress={() => navigation.navigate('EmojiPicker')}>
        <Text style={styles().emoji}>
          {nodeEmoji.get(icon || 'hourglass_flowing_sand')}
        </Text>
      </TouchableOpacity>
      <Input placeholder="Name" value={name} onChangeText={onNameChange} />
      <DatePicker
        name="datePicker"
        value={date}
        placeholder="Date"
        onPress={() => null}
        onChangeText={(_, selectedDate) =>
          selectedDate && onDateChange(format(selectedDate, 'yyyy/MM/dd'))
        }
      />
    </View>
  );
};

export default CounterForm;
