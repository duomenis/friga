import React, {FC, useLayoutEffect, useState} from 'react';
import {View, Button, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import {differenceInCalendarDays, format} from 'date-fns';
import nodeEmoji from 'node-emoji';

import {useData} from '../../DataContext';
import {RootStackParamList} from '../../types';
import DatePicker from '../../components/DatePicker';
import Input from '../../components/Input';

import styles from './CreateCounter.styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RouteProp} from '@react-navigation/native';

type ListRouteProp = RouteProp<RootStackParamList, 'CreateCounter'>;

type ViewProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: ListRouteProp;
};

const CreateCounter: FC<ViewProps> = ({navigation, route}) => {
  const {addCounter} = useData();
  const icon = route.params?.icon || 'christmas_tree';
  const today = new Date().setHours(0, 0, 0, 0);
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>(format(new Date(), 'yyyy/MM/dd'));

  useLayoutEffect(() => {
    const handleAddButtonClick = () => {
      addCounter({key: nanoid(), icon, name, date});
      const counterDate = new Date(date).setHours(0, 0, 0, 0);
      const diff = differenceInCalendarDays(today, counterDate);
      if (diff >= 0) {
        navigation.navigate('RootTab', {
          screen: 'SinceListStack',
          params: {screen: 'SinceList', params: {since: true}},
        });
      } else {
        navigation.navigate('RootTab', {
          screen: 'UntilListStack',
          params: {screen: 'UntilList'},
        });
      }
    };

    navigation.setOptions({
      headerRight: () => (
        <Button
          disabled={!name || !date}
          onPress={handleAddButtonClick}
          title="Add"
        />
      ),
      headerLeft: () => (
        <Button onPress={() => navigation.goBack()} title="Cancel" />
      ),
    });
  }, [navigation, name, date, addCounter, today, icon]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigation.navigate('EmojiPicker')}>
        <Text style={styles.emoji}>{nodeEmoji.get(icon)}</Text>
      </TouchableOpacity>
      <Input placeholder="Name" value={name} onChangeText={setName} />
      <DatePicker
        name="datePicker"
        value={date}
        placeholder="Date"
        onPress={() => null}
        onChangeText={(_, selectedDate) =>
          selectedDate && setDate(format(selectedDate, 'yyyy/MM/dd'))
        }
      />
    </View>
  );
};

export default CreateCounter;
