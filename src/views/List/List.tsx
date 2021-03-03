import React, {FC, useCallback, useLayoutEffect} from 'react';
import {View, Button, ListRenderItemInfo} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {differenceInCalendarDays, format} from 'date-fns';
import {SwipeListView} from 'react-native-swipe-list-view';
import {RouteProp} from '@react-navigation/native';

import {
  ListItemType,
  RootStackParamList,
  SinceListStackParamList,
} from '../../types';
import ListItem from '../../components/ListItem';
import {useData} from '../../DataContext';
import ListActions from '../../components/ListActions';
import Empty from '../../components/Empty';

type ListRouteProp = RouteProp<SinceListStackParamList, 'SinceList'>;

type ViewProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: ListRouteProp;
};

const List: FC<ViewProps> = ({navigation, route}) => {
  const {
    state: {counters},
    deleteCounter,
  } = useData();

  const isSince = route.params?.since;

  let listCounters: ListItemType[] | undefined = counters?.map((counter) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const counterDate = new Date(counter.date).setHours(0, 0, 0, 0);
    const diff = differenceInCalendarDays(today, counterDate);
    return {
      ...counter,
      date: format(new Date(counter.date), 'E, LLLL d, yyyy'),
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
    (data: ListRenderItemInfo<ListItemType>) => {
      const handleDelete = (key: string) => {
        deleteCounter(key);
      };
      return <ListActions data={data} onDelete={handleDelete} />;
    },
    [deleteCounter],
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
    <View>
      <SwipeListView
        data={listCounters}
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

export default List;
