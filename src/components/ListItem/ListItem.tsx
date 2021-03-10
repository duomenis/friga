import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {formatDuration, intervalToDuration} from 'date-fns';

import {ListItemType} from '../../types';
import Emoji from '../Emoji';

import styles from './ListItem.styles';

type Props = {
  item: ListItemType;
};

const ListItem: FC<Props> = ({item}) => {
  const {date, name, icon} = item;
  const duration = intervalToDuration({
    start: new Date().setHours(0, 0, 0, 0),
    end: new Date(date).setHours(0, 0, 0, 0),
  });
  return (
    <View style={styles.container}>
      <Emoji name={icon || 'christmas_tree'} />
      <View style={styles.left}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.format}>
          {date} ·{' '}
          {formatDuration(duration, {
            format: ['years', 'months', 'days'],
            delimiter: ', ',
          })}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(ListItem);
