import React, {FC, useLayoutEffect, useState} from 'react';
import {Button, ScrollView, useColorScheme} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import nodeEmoji from 'node-emoji';
import {differenceInCalendarDays, format} from 'date-fns';
import {RouteProp} from '@react-navigation/native';

import {useData} from '../../DataContext';
import {Icon, RootStackParamList} from '../../types';
import colors from '../../constants/colors';
import CounterForm from '../../components/CounterForm';

type ListRouteProp = RouteProp<RootStackParamList, 'EditCounter'>;

type ViewProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: ListRouteProp;
};

const EditCounter: FC<ViewProps> = ({navigation, route}) => {
  const scheme = useColorScheme() || 'light';
  const {updateCounter, deleteCounter} = useData();
  const {counter} = route.params;
  const today = new Date().setHours(0, 0, 0, 0);
  const [name, setName] = useState<string>(counter.name);
  const [date, setDate] = useState<string>(
    format(new Date(counter.date), 'yyyy/MM/dd'),
  );
  const [icon, setIcon] = useState<keyof typeof nodeEmoji.emoji>(counter.icon);

  useLayoutEffect(() => {
    const handleSaveButtonClick = () => {
      updateCounter({
        ...counter,
        name,
        date,
        icon,
      });
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
          onPress={handleSaveButtonClick}
          title="Save"
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
  }, [navigation, name, date, scheme, counter, updateCounter, today, icon]);

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleDateChange = (value: string) => {
    setDate(value);
  };

  const handleDeleteButtonClick = () => {
    deleteCounter(counter.key);
    navigation.goBack();
  };

  const handleIconChange = ({value}: {value: Icon}) => {
    setIcon(value);
  };

  return (
    <ScrollView>
      <CounterForm
        name={name}
        onNameChange={handleNameChange}
        date={date}
        onDateChange={handleDateChange}
        icon={icon}
        onIconChange={handleIconChange}
        navigation={navigation}
      />
      <Button
        color={colors.deleteActionBackground}
        onPress={handleDeleteButtonClick}
        title="Delete"
      />
    </ScrollView>
  );
};

export default EditCounter;
