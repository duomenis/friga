import React, {FC} from 'react';

import {formatDuration, intervalToDuration} from 'date-fns';
import {Text, View, useColorScheme, TouchableOpacity} from 'react-native';

import {ListItemType} from '../../types';
import Emoji from '../Emoji';

import {styles} from './ListItem.styles';

type Props = {
  item: ListItemType;
  onPress: (item: ListItemType) => void;
};

const ListItem: FC<Props> = ({item, onPress}) => {
  const scheme = useColorScheme() || 'light';
  const {date, name, icon} = item;
  const duration = intervalToDuration({
    start: new Date().setHours(0, 0, 0, 0),
    end: new Date(date).setHours(0, 0, 0, 0),
  });
  return (
    <TouchableOpacity
      style={styles(scheme).container}
      onPress={() => onPress(item)}>
      <Emoji name={icon} style={styles(scheme).icon} />
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
    </TouchableOpacity>
  );
};

export default React.memo(ListItem);
