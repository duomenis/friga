import React from 'react';
import {View, Button} from 'react-native';
import {useAuth} from '../../AuthContext';

const Login = () => {
  const {signIn} = useAuth();
  return (
    <View>
      <Button title="Log in" onPress={signIn} />
    </View>
  );
};

export default Login;
