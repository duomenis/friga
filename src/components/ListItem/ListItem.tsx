import React, {FC} from 'react';
import {Text, View, useColorScheme} from 'react-native';
import {formatDuration, intervalToDuration} from 'date-fns';

import {ListItemType} from '../../types';
import Emoji from '../Emoji';

import {styles} from './ListItem.styles';

type Props = {
  item: ListItemType;
};

const ListItem: FC<Props> = ({item}) => {
  const scheme = useColorScheme() || 'light';
  const {date, name, icon} = item;
  const duration = intervalToDuration({
    start: new Date().setHours(0, 0, 0, 0),
    end: new Date(date).setHours(0, 0, 0, 0),
  });
  return (
    <View style={styles(scheme).container}>
      <Emoji name={icon || 'hourglass_flowing_sand'} />
      <View style={styles().left}>
        <Text style={styles(scheme).name}>{name}</Text>
        <Text style={styles(scheme).format}>
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
