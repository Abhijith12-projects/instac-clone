import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PostHeader = ({user}) => {
  console.log(user);
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', height: 50}}>
      <Image style={styles.profileImage} source={user.profilePic} />
      <Text style={{color: 'white', fontWeight: '800'}}>{user.user}</Text>
    </View>
  );
};
const Post = ({post}) => {
  return (
    <View style={styles.container}>
      <PostHeader user={post} />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  profileImage: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e41a6e',
    marginHorizontal: 10,
  },
});
