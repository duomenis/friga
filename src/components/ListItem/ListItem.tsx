import React, {FC} from 'react';
import {Text, View} from 'react-native';

import {ListItemType} from '../../types';

import styles from './ListItem.styles';

type Props = {
  item: ListItemType;
};

const ListItem: FC<Props> = ({item}) => {
  const {date, differenceInCalendarDays, name} = item;
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.name}>{name}</Text>
        <Text>{date}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.days}>{Math.abs(differenceInCalendarDays)}</Text>
        <Text>{differenceInCalendarDays === 1 ? 'day' : 'days'}</Text>
      </View>
    </View>
  );
};

export default React.memo(ListItem);
