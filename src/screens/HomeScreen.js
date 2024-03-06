import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Stories from '../../components/Stories';
import Post from '../../components/Post';
import posts from '../../DummyData/posts';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Stories />
        <View style={styles.postContainer}>
          {posts.map((post, index) => (
            <Post key={index.toString()} post={post} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  content: {
    justifyContent: 'center',
  },
  postContainer: {
    marginTop: 20,
  },
});
