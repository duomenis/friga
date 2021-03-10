import React, {FC} from 'react';
import {Text, TextProps, TextStyle} from 'react-native';
import nodeEmoji from 'node-emoji';

type Props = {
  name: keyof typeof nodeEmoji.emoji;
  style: TextStyle;
} & TextProps;

const Emoji: FC<Props> = ({name, style = {}, ...props}) => {
  return (
    <Text style={style} {...props}>
      {nodeEmoji.get(name)}
    </Text>
  );
};

export default Emoji;
