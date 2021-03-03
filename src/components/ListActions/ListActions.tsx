import React, {FC} from 'react';

import {Text, TouchableOpacity, ListRenderItemInfo, View} from 'react-native';

import {ListItemType} from '../../types';

import styles from './ListActions.styles';

type Props = {
  data: ListRenderItemInfo<ListItemType>;
  onDelete: (key: string) => void;
};

const ListAction: FC<Props> = ({data, onDelete}) => (
  <View style={styles.rowBack}>
    <TouchableOpacity
      style={[styles.backRightBtn, styles.backRightBtnRight]}
      onPress={() => onDelete(data.item.key)}>
      <Text style={styles.backTextWhite}>Delete</Text>
    </TouchableOpacity>
  </View>
);

export default React.memo(ListAction);
