import React, {FC, useCallback, useLayoutEffect} from 'react';

import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {differenceInCalendarDays, format} from 'date-fns';
import {
  View,
  Text,
  useColorScheme,
  StatusBar,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Empty from '../../components/Empty';
import ListItem from '../../components/ListItem';
import colors from '../../constants/colors';
import {useData} from '../../DataContext';
import {
  ListItemType,
  RootStackParamList,
  SinceListStackParamList,
} from '../../types';

import {styles} from './List.styles';

type ListRouteProp = RouteProp<SinceListStackParamList, 'SinceList'>;

type ViewProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: ListRouteProp;
};

const List: FC<ViewProps> = ({navigation, route}) => {
  const scheme = useColorScheme() || 'light';
  const {
    state: {events},
  } = useData();

  const isSince = route.params?.since;

  let listEvents: ListItemType[] | undefined = events?.map((event) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const eventDate = new Date(event.date).setHours(0, 0, 0, 0);
    const diff = differenceInCalendarDays(today, eventDate);
    return {
      ...event,
      date: format(new Date(event.date), 'LLLL d, yyyy'),
      differenceInCalendarDays: diff,
    };
  });

  if (isSince) {
    listEvents = listEvents
      ?.filter((event) => event.differenceInCalendarDays >= 0)
      .sort((a, b) => a.differenceInCalendarDays - b.differenceInCalendarDays);
  } else {
    listEvents = listEvents
      ?.filter((event) => event.differenceInCalendarDays < 0)
      .sort((a, b) => b.differenceInCalendarDays - a.differenceInCalendarDays);
  }

  // https://github.com/react-navigation/react-navigation/commit/a204edd012060f0816eddee7a093183aa379d049
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(
        scheme === 'dark' ? 'light-content' : 'dark-content',
      );
    }, [scheme]),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor={colors[scheme].modalHeaderBackground}
          style={styles().buttonContainer}
          onPress={() => navigation.navigate('CreateEvent')}>
          <Icon name="plus" style={styles(scheme).button} size={28} />
        </TouchableHighlight>
      ),
    });
  }, [navigation, scheme]);

  const listItem = useCallback(
    ({item}: {item: ListItemType}) => {
      const handleItemPress = (event: ListItemType) => {
        navigation.navigate('EditEvent', {event});
      };
      return <ListItem item={item} onPress={handleItemPress} />;
    },
    [navigation],
  );

  if (!listEvents || listEvents.length === 0) {
    return (
      <Empty
        action={() => navigation.navigate('CreateEvent')}
        type={isSince ? 'Since' : 'Until'}
      />
    );
  }

  return (
    <View style={styles().container}>
      <Text style={styles(scheme).title}>
        Days {isSince ? 'Since' : 'Until'}
      </Text>
      <FlatList data={listEvents} renderItem={listItem} />
    </View>
  );
};

export default List;
