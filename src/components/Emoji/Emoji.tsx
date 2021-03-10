import React, {FC} from 'react';
import {Text, View} from 'react-native';
import nodeEmoji from 'node-emoji';

import styles from './Emoji.styles';

type Props = {
  name: keyof typeof nodeEmoji.emoji;
};

const Emoji: FC<Props> = ({name}) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.icon}>{nodeEmoji.get(name)}</Text>
      </View>
    </View>
  );
};

export default Emoji;
