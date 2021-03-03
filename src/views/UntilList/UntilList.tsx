import React, {FC, useCallback, useLayoutEffect} from 'react';
import {View, Button, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {differenceInCalendarDays, format} from 'date-fns';

import {ListItemType, RootStackParamList} from '../../types';
import ListItem from '../../components/ListItem';
import {useData} from '../../DataContext';

type ViewProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const UntilList: FC<ViewProps> = ({navigation}) => {
  const {
    state: {counters},
  } = useData();

  const untilCounters: ListItemType[] | undefined = counters
    ?.map((counter) => {
      const today = new Date().setHours(0, 0, 0, 0);
      const counterDate = new Date(counter.date).setHours(0, 0, 0, 0);
      const diff = differenceInCalendarDays(today, counterDate);
      return {
        ...counter,
        date: format(new Date(counter.date), 'E, LLLL do yyyy'),
        differenceInCalendarDays: diff,
      };
    })
    .filter((counter) => counter.differenceInCalendarDays < 0)
    .sort((a, b) => b.differenceInCalendarDays - a.differenceInCalendarDays);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('CreateCounter')}
          title="Add"
        />
      ),
      headerTitleAlign: 'left',
    });
  }, [navigation]);

  const renderListItem = useCallback(
    ({item}: {item: ListItemType}) => <ListItem item={item} />,
    [],
  );

  return (
    <View>
      <FlatList data={untilCounters} renderItem={renderListItem} />
    </View>
  );
};

export default UntilList;
