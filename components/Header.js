import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
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
