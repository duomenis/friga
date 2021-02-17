import React from 'react';
import {View, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeNonModalStackParamList} from '../../types';
import {useAuth} from '../../AuthContext';
type ViewProps = {
  navigation: StackNavigationProp<HomeNonModalStackParamList>;
};

const Home = ({navigation}: ViewProps) => {
  const {signOut} = useAuth();
  return (
    <View>
      <Button title="Log out" onPress={signOut} />
      <Button title="Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
};

export default Home;
