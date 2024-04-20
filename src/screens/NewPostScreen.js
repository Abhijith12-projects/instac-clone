import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AddNewPost from '../../components/NewPost/AddNewPost';
import FormikPostUploader from '../../components/NewPost/FormikPostUploader';

const NewPostScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <AddNewPost />
      <FormikPostUploader />
    </SafeAreaView>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({});
