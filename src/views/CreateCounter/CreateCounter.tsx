import React, {FC, useLayoutEffect, useState} from 'react';
import {Button, ScrollView, useColorScheme} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import {differenceInCalendarDays, format} from 'date-fns';

import {useData} from '../../DataContext';
import {Icon, RootStackParamList} from '../../types';
import colors from '../../constants/colors';
import CounterForm from '../../components/CounterForm';

type ViewProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const CreateCounter: FC<ViewProps> = ({navigation}) => {
  const scheme = useColorScheme() || 'light';
  const {addCounter} = useData();
  const today = new Date().setHours(0, 0, 0, 0);
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>(format(new Date(), 'yyyy/MM/dd'));
  const [icon, setIcon] = useState<Icon>('hourglass_flowing_sand');

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
          color={colors[scheme].accent}
          disabled={!name || !date}
          onPress={handleAddButtonClick}
          title="Add"
        />
      ),
      headerLeft: () => (
        <Button
          color={colors[scheme].accent}
          onPress={() => navigation.goBack()}
          title="Cancel"
        />
      ),
    });
  }, [navigation, name, date, addCounter, today, icon, scheme]);

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleDateChange = (value: string) => {
    setDate(value);
  };

  const handleIconChange = ({value}: {value: Icon}) => {
    setIcon(value);
  };

  return (
    <ScrollView>
      <CounterForm
        name={name}
        date={date}
        icon={icon}
        onIconChange={handleIconChange}
        onNameChange={handleNameChange}
        onDateChange={handleDateChange}
        navigation={navigation}
      />
    </ScrollView>
  );
};

export default CreateCounter;
