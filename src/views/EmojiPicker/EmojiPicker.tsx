import React, {FC} from 'react';
import {SafeAreaView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import nodeEmoji from 'node-emoji';

import EmojiSelector from 'react-native-emoji-selector';
import {RootStackParamList} from '../../types';

import styles from './EmojiPicker.styles';

type ViewProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const EmojiPicker: FC<ViewProps> = ({navigation}) => {
  const handleEmojiSelect = (emoji: keyof typeof nodeEmoji.emoji) => {
    navigation.navigate('CreateCounter', {icon: emoji});
  };
  return (
    <SafeAreaView style={styles.container}>
      <EmojiSelector onEmojiSelected={handleEmojiSelect} showHistory={true} />
    </SafeAreaView>
  );
};

export default EmojiPicker;
