import React, {FC, useLayoutEffect} from 'react';
import {SafeAreaView, Button, useColorScheme} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import nodeEmoji from 'node-emoji';
import EmojiSelector from 'react-native-emoji-selector';

import colors from '../../constants/colors';
import {RootStackParamList} from '../../types';

import {styles} from './EmojiPicker.styles';

type EmojiPickerRouteProp = RouteProp<RootStackParamList, 'EmojiPicker'>;

type ViewProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: EmojiPickerRouteProp;
};

const EmojiPicker: FC<ViewProps> = ({navigation, route}) => {
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
    navigation.goBack();
    route.params.onSelect({value: emoji});
  };
  return (
    <SafeAreaView style={styles(scheme).container}>
      <EmojiSelector
        onEmojiSelected={handleEmojiSelect}
        showHistory={true}
        columns={8}
      />
    </SafeAreaView>
  );
};

export default EmojiPicker;
