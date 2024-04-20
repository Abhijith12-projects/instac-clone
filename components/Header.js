import {StyleSheet, View, TouchableOpacity, Image, Alert} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

const Header = () => {
  const signOut = () => {
    auth()
      .signOut()
      .then(() => Alert.alert('User signed out!'));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signOut}>
        <Image
          style={styles.instagramImage}
          source={require('../assets/instagram.png')}
        />
      </TouchableOpacity>
      <View style={styles.rightContainer}>
        <TouchableOpacity>
          <Image
            style={styles.imageContainer}
            source={require('../assets/notifications.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.imageContainer}
            source={require('../assets/messeges.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  rightContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginLeft: 20,
  },
  instagramImage: {
    width: 150,
    height: 40,
    resizeMode: 'contain',
  },
});
