import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const PostHeader = ({user}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.userInfoContainer}>
        <Image style={styles.profileImage} source={{uri: user.profilePic}} />
        <Text style={styles.username}>{user.user}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.moreOptions}>...</Text>
      </TouchableOpacity>
    </View>
  );
};

const PostImage = ({user}) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{uri: user.imageUrl}}
        resizeMode="cover"
      />
    </View>
  );
};

const PostComments = ({user}) => {
  return (
    <View style={{marginTop: 5}}>
      <Text
        style={{color: '#ccc', fontSize: 15, fontWeight: 'bold', margin: 5}}>
        {user.likes_by_users.length.toLocaleString('en')} likes
      </Text>
      {user.comments.length > 0 && <CommentsSection user={user} />}
    </View>
  );
};
const Caption = ({username, caption}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginLeft: 5,
      }}>
      <TouchableOpacity>
        <Text style={styles.username}>{username}</Text>
      </TouchableOpacity>
      <Text style={{color: 'white', marginLeft: 10}}>{caption}</Text>
    </View>
  );
};

const CommentsSection = ({user}) => {
  return (
    <View style={{marginTop: 5, marginLeft: 5}}>
      <TouchableOpacity>
        <Text style={{color: 'gray'}}>
          View {user.comments.length > 10 ? 'all' : user.comments.length}
          {user.comments.length > 1 ? ' comments' : ' comment'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Comments = ({user}) => {
  const limitedComments = user.comments.slice(0, 2);

  return (
    <View style={{margin: 5}}>
      {limitedComments.map((comment, index) => (
        <Text key={index} style={{color: 'white', margin: 2}}>
          <Text style={{fontWeight: '600'}}>{comment.user} </Text>
          {comment.comments}
        </Text>
      ))}
    </View>
  );
};

import auth from '@react-native-firebase/auth';

const Buttons = ({post, setPost}) => {
  const [liked, setLiked] = useState(
    post.likes_by_users.includes(auth().currentUser.email),
  );

  const handleLike = async () => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        Alert.alert('No user is currently authenticated.');
        return;
      }

      const postRef = firestore()
        .collection('random-users')
        .doc(post.owner_id)
        .collection('posts')
        .doc(post.postId);

      const postDoc = await postRef.get();
      if (!postDoc.exists) {
        Alert.alert('Post not found.');
        return;
      }

      const postData = postDoc.data();

      if (!postData.likes_by_users.includes(currentUser.email)) {
        await postRef.update({
          likes_by_users: [...postData.likes_by_users, currentUser.email],
        });
        setLiked(true);
        setPost({
          ...post,
          likes_by_users: [...postData.likes_by_users, currentUser.email],
        });
      } else {
        const updatedLikes = postData.likes_by_users.filter(
          email => email !== currentUser.email,
        );
        await postRef.update({
          likes_by_users: updatedLikes,
        });
        setLiked(false);
        setPost({...post, likes_by_users: updatedLikes});
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View
        style={{
          flexDirection: 'row',
          width: '32%',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={handleLike}>
          <Image
            style={{width: 28, height: 28, resizeMode: 'contain'}}
            source={
              liked
                ? require('../assets/liked.png')
                : require('../assets/notifications.png')
            }
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={{width: 28, height: 28, resizeMode: 'contain'}}
            source={require('../assets/messeges.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={{width: 28, height: 28, resizeMode: 'contain'}}
            source={require('../assets/share.png')}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Image
          style={{width: 28, height: 28, resizeMode: 'contain', marginRight: 5}}
          source={require('../assets/save.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const Post = ({post}) => {
  const [updatedPost, setUpdatedPost] = useState(post);

  useEffect(() => {
    setUpdatedPost(post);
  }, [post]);

  return (
    <View style={styles.postContainer}>
      <View style={{marginBottom: 10}}>
        <PostHeader user={updatedPost} />
      </View>
      <PostImage user={updatedPost} />
      <View style={{marginLeft: 10}}>
        <Buttons post={updatedPost} setPost={setUpdatedPost} />
        <Caption username={updatedPost.user} caption={updatedPost.caption} />
        <PostComments user={updatedPost} />
        <Comments user={updatedPost} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e41a6e',
    marginRight: 10,
  },
  username: {
    color: '#ccc',
    fontWeight: '700',
  },
  moreOptions: {
    color: 'white',
    fontWeight: '900',
    fontSize: 25,
    marginRight: 10,
  },
  imageContainer: {
    height: 400,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    width: '100%',
  },
  imageLike: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  imageContainerLeft: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
  },
});

export default Post;
