import React, {FC, useLayoutEffect, useState} from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import nodeEmoji from 'node-emoji';
import {differenceInCalendarDays, format} from 'date-fns';
import {RouteProp} from '@react-navigation/native';

import {useData} from '../../DataContext';
import {Icon, RootStackParamList} from '../../types';
import colors from '../../constants/colors';
import EventForm from '../../components/EventForm';

import {styles} from './EditEvent.styles';

type ListRouteProp = RouteProp<RootStackParamList, 'EditEvent'>;

type ViewProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: ListRouteProp;
};

const EditEvent: FC<ViewProps> = ({navigation, route}) => {
  const scheme = useColorScheme() || 'light';
  const {updateEvent, deleteEvent} = useData();
  const {event} = route.params;
  const today = new Date().setHours(0, 0, 0, 0);
  const [name, setName] = useState<string>(event.name);
  const [date, setDate] = useState<string>(
    format(new Date(event.date), 'yyyy/MM/dd'),
  );
  const [icon, setIcon] = useState<keyof typeof nodeEmoji.emoji>(event.icon);

  useLayoutEffect(() => {
    const handleSaveButtonClick = () => {
      updateEvent({
        ...event,
        name,
        date,
        icon,
      });
      const eventDate = new Date(date).setHours(0, 0, 0, 0);
      const diff = differenceInCalendarDays(today, eventDate);
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
  }, [navigation, name, date, scheme, event, updateEvent, today, icon]);

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleDateChange = (value: string) => {
    setDate(value);
  };

  const handleDeleteButtonClick = () => {
    Alert.alert(
      'Do you want to delete this event?',
      'You cannot undo this action',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteEvent(event.key);
            navigation.goBack();
          },
          style: 'destructive',
        },
      ],
    );
  };

  const handleIconChange = ({value}: {value: Icon}) => {
    setIcon(value);
  };

  return (
    <ScrollView style={styles(scheme).container}>
      {
        // https://github.com/react-navigation/react-navigation/commit/a204edd012060f0816eddee7a093183aa379d049
      }
      <StatusBar barStyle={'light-content'} />
      <EventForm
        name={name}
        onNameChange={handleNameChange}
        date={date}
        onDateChange={handleDateChange}
        icon={icon}
        onIconChange={handleIconChange}
        navigation={navigation}
        isEdit
        onDelete={handleDeleteButtonClick}
      />
    </ScrollView>
  );
};

export default EditEvent;
