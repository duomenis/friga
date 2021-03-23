import React, {FC, useCallback, useLayoutEffect} from 'react';
import {View, Text, useColorScheme, StatusBar} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {differenceInCalendarDays, format} from 'date-fns';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import {
  ListItemType,
  RootStackParamList,
  SinceListStackParamList,
} from '../../types';
import ListItem from '../../components/ListItem';
import {useData} from '../../DataContext';
import Empty from '../../components/Empty';

import {styles} from './List.styles';
import {FlatList, TouchableHighlight} from 'react-native-gesture-handler';
import colors from '../../constants/colors';

type ListRouteProp = RouteProp<SinceListStackParamList, 'SinceList'>;

type ViewProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: ListRouteProp;
};

const List: FC<ViewProps> = ({navigation, route}) => {
  const scheme = useColorScheme() || 'light';
  const {
    state: {counters},
  } = useData();

  const isSince = route.params?.since;

  let listCounters: ListItemType[] | undefined = counters?.map((counter) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const counterDate = new Date(counter.date).setHours(0, 0, 0, 0);
    const diff = differenceInCalendarDays(today, counterDate);
    return {
      ...counter,
      date: format(new Date(counter.date), 'LLLL d, yyyy'),
      differenceInCalendarDays: diff,
    };
  });

  if (isSince) {
    listCounters = listCounters
      ?.filter((counter) => counter.differenceInCalendarDays >= 0)
      .sort((a, b) => a.differenceInCalendarDays - b.differenceInCalendarDays);
  } else {
    listCounters = listCounters
      ?.filter((counter) => counter.differenceInCalendarDays < 0)
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
          onPress={() => navigation.navigate('CreateCounter')}>
          <Icon name="plus" style={styles(scheme).button} size={28} />
        </TouchableHighlight>
      ),
    });
  }, [navigation, scheme]);

  const listItem = useCallback(
    ({item}: {item: ListItemType}) => {
      const handleItemPress = (counter: ListItemType) => {
        navigation.navigate('EditCounter', {counter});
      };
      return <ListItem item={item} onPress={handleItemPress} />;
    },
    [navigation],
  );

  if (!listCounters || listCounters.length === 0) {
    return (
      <Empty
        action={() => navigation.navigate('CreateCounter')}
        type={isSince ? 'Since' : 'Until'}
      />
    );
  }

  return (
    <View style={styles().container}>
      <Text style={styles(scheme).title}>
        Days {isSince ? 'Since' : 'Until'}
      </Text>
      <FlatList data={listCounters} renderItem={listItem} />
    </View>
  );
};

export default List;
