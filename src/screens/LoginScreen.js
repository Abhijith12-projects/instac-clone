import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import LoginForm from '../../components/Login/LoginForm';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{marginTop: 100, alignItems: 'center'}}>
        <Image
          style={{width: 100, height: 100, resizeMode: 'contain'}}
          source={require('../../assets/instagramlogo.png')}
        />
      </View>
      <LoginForm />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171a17',
    paddingTop: 50,
    paddingHorizontal: 12,
  },
});
