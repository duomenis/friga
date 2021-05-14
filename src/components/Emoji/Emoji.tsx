import React, {FC} from 'react';

import nodeEmoji from 'node-emoji';
import {Text, View, useColorScheme, ViewProps} from 'react-native';

import {styles} from './Emoji.styles';

type Props = {
  name: keyof typeof nodeEmoji.emoji;
} & ViewProps;

const Emoji: FC<Props> = ({name, style}) => {
  const scheme = useColorScheme() || 'light';
  return (
    <View style={[style, styles(scheme).container]}>
      <Text style={styles().icon}>{nodeEmoji.get(name)}</Text>
    </View>
  );
};

export default Emoji;
