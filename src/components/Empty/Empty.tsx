import React, {FC} from 'react';

import {Button, Image, Text, View} from 'react-native';

import Images from '../../images';
import styles from './Empty.styles';

type Props = {
  action: () => void;
  type: 'Since' | 'Until';
};

const Empty: FC<Props> = ({action, type}) => (
  <View style={styles.container}>
    <Image style={styles.image} source={Images.Empty} />
    <Text style={styles.text}>No {type} Counters, yet.</Text>
    <Text style={styles.info}>Start adding some.</Text>
    <Button title="Add Counter" onPress={action} />
  </View>
);

export default Empty;
