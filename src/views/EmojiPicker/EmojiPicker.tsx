import React, {FC, useLayoutEffect} from 'react';
import {SafeAreaView, Button, useColorScheme} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import nodeEmoji from 'node-emoji';
import EmojiSelector from 'react-native-emoji-selector';

import colors from '../../constants/colors';
import {RootStackParamList} from '../../types';

import styles from './EmojiPicker.styles';

type ViewProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const EmojiPicker: FC<ViewProps> = ({navigation}) => {
  const scheme = useColorScheme() || 'light';
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => navigation.goBack()}
          title="Cancel"
          color={colors[scheme].accent}
        />
      ),
    });
  }, [navigation, scheme]);
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
