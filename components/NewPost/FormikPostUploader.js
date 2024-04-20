import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Button,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useReducer} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import validUrl from 'valid-url';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required'),
  caption: Yup.string().max(2200, 'Caption has reached the character limit'),
});

const IMG_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJiT-UHSm6w0Jperb8SitpfoAKeMUE3uynPg5YO-2Drw&s';

const FormikPostUploader = () => {
  const [thumbNailUrl, setThumbNailUrl] = useState(IMG_URL);
  const navigation = useNavigation();

  const [currentUser, setCurrentUser] = useState(null);
  const [loggedInUser, setLoggedinUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const fetchCurrentUser = async () => {
    if (currentUser) {
      try {
        const userDocRef = firestore()
          .collection('random-users')
          .doc(currentUser.email);
        const userDocSnapshot = await userDocRef.get();

        if (userDocSnapshot.exists) {
          const userData = userDocSnapshot.data();
          setLoggedinUser(userData);
        } else {
          console.error(
            'User document does not exist for user ID:',
            currentUser.uid,
          );
        }
      } catch (error) {
        console.error('Error fetching current user data:', error);
      }
    } else {
      console.error('No user is currently logged in.');
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [currentUser]);

  const addPostToFirestore = async (caption, imageUrl) => {
    try {
      if (!currentUser || !currentUser.email) {
        throw new Error('No user is currently logged in.');
      }

      // Get a reference to the document and generate the postId
      const userDocRef = firestore()
        .collection('random-users')
        .doc(currentUser.email)
        .collection('posts')
        .doc();

      // Get the postId
      const postId = userDocRef.id;

      // Set the document data including the postId
      await userDocRef.set({
        postId: postId, // Include the postId in the document
        owner_id: currentUser.email,
        imageUrl: imageUrl,
        caption: caption,
        created_at: firestore.FieldValue.serverTimestamp(),
        user: loggedInUser.user_name,
        profilePic: loggedInUser.profile_picture,
        likes: 0,
        likes_by_users: [],
        comments: [],
      });

      Alert.alert('Success', 'Post added successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to add post. Please try again later.');
    }
  };

  return (
    <Formik
      initialValues={{caption: '', imageUrl: ''}}
      onSubmit={async values => {
        try {
          await addPostToFirestore(values.caption, values.imageUrl);
          navigation.goBack();
        } catch (error) {
          console.error('Error submitting post:', error);
        }
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}>
      {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Image
              style={{width: 200, height: 200}}
              source={{
                uri: validUrl.isUri(thumbNailUrl) ? thumbNailUrl : IMG_URL,
              }}
            />
            <View style={{flex: 1, marginLeft: 12}}>
              <TextInput
                placeholder="Write a caption"
                placeholderTextColor="gray"
                multiline={true}
                style={{color: 'white', fontSize: 20}}
                onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                value={values.caption}
              />
            </View>
          </View>
          <TextInput
            onChange={e => {
              setThumbNailUrl(e.nativeEvent.text);
            }}
            placeholder="Enter image url"
            placeholderTextColor="gray"
            multiline={true}
            style={{color: 'white', fontSize: 18}}
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{fontSize: 14, color: 'red', margin: 10}}>
              {errors.imageUrl}
            </Text>
          )}
          <Button title="Share" onPress={handleSubmit} disabled={!isValid} />
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;

const styles = StyleSheet.create({});
