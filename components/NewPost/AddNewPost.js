import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const AddNewPost = () => {
  const navigation = useNavigation();

  return (
    <View style={{marginTop: 10}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.image}
            source={require('../../assets/back.png')}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            marginRight: '38%',
            fontSize: 24,
            fontWeight: '500',
          }}>
          New Post
        </Text>
      </View>
    </View>
  );
};

export default AddNewPost;

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
