import {SafeAreaView, StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import Stories from '../../components/Stories';
import Post from '../../components/Post';
import BottomTab from '../../components/BottomTab';
import bottomicons from '../../DummyData/bottomicons';
import firestore from '@react-native-firebase/firestore';
import posts from '../../DummyData/posts';

const HomeScreen = () => {
  const [newPosts, setNewPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setRefreshing(true);
      const usersCollectionRef = firestore().collection('random-users');
      const usersQuerySnapshot = await usersCollectionRef.get();

      const allPosts = [];
      await Promise.all(
        usersQuerySnapshot.docs.map(async userDoc => {
          const postsQuerySnapshot = await userDoc.ref
            .collection('posts')
            .get();
          postsQuerySnapshot.forEach(postDoc => {
            const postData = postDoc.data();
            const createdAtTimestamp = postData.created_at.toDate();
            allPosts.push({...postData, created_at: createdAtTimestamp});
          });
        }),
      );

      allPosts.sort((a, b) => b.created_at - a.created_at);

      setNewPosts(allPosts);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    fetchPosts();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={newPosts}
        renderItem={({item}) => <Post post={item} />}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<Stories />}
        contentContainerStyle={styles.postContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <BottomTab icons={bottomicons} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  postContainer: {
    // marginTop: 20,
  },
});
