import React, {FC} from 'react';

import {Button, Image, Text, View, useColorScheme} from 'react-native';
import colors from '../../constants/colors';

import Images from '../../images';
import {styles} from './Empty.styles';

type Props = {
  action: () => void;
  type: 'Since' | 'Until';
};

const Empty: FC<Props> = ({action, type}) => {
  const scheme = useColorScheme() || 'light';
  return (
    <View style={styles(scheme).container}>
      <Image
        style={styles().image}
        source={scheme === 'light' ? Images.Empty : Images.EmptyDark}
      />
      <Text style={styles(scheme).text}>No {type} Counters, yet.</Text>
      <Text style={styles(scheme).info}>Start adding some.</Text>
      <Button
        title="Add Counter"
        onPress={action}
        color={colors[scheme].accent}
      />
    </View>
  );
};

export default Empty;
