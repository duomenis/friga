import React, {FC, useCallback, useLayoutEffect} from 'react';
import {View, Button, ListRenderItemInfo} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {differenceInCalendarDays, format} from 'date-fns';
import {SwipeListView} from 'react-native-swipe-list-view';

import {ListItemType, RootStackParamList} from '../../types';
import ListItem from '../../components/ListItem';
import {useData} from '../../DataContext';
import ListActions from '../../components/ListActions';

type ViewProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const UntilList: FC<ViewProps> = ({navigation}) => {
  const {
    state: {counters},
    deleteCounter,
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

  const handleDelete = (key: string) => {
    deleteCounter(key);
  };

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

  const listItem = useCallback(
    ({item}: {item: ListItemType}) => <ListItem item={item} />,
    [],
  );

  const listActions = useCallback(
    (data: ListRenderItemInfo<ListItemType>) => (
      <ListActions data={data} onDelete={handleDelete} />
    ),
    [],
  );

  return (
    <View>
      <SwipeListView
        data={untilCounters}
        renderItem={listItem}
        renderHiddenItem={listActions}
        closeOnScroll
        closeOnRowOpen
        closeOnRowPress
        disableRightSwipe
        leftOpenValue={0}
        rightOpenValue={-75}
        swipeToOpenPercent={20}
      />
    </View>
  );
};

export default UntilList;
