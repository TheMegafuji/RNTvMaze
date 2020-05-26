import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

const Login = ({navigation}) => {
  useEffect(() => {
    navigation.replace('Home');
  }, [navigation]);

  return (
    <View>
      <Text> Login </Text>
    </View>
  );
};

export default Login;
