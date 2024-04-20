import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import data from '../DummyData/data';
import FastImage from 'react-native-fast-image';

const Stories = () => {
  return (
    <ScrollView horizontal={true} style={styles.storiesContainer}>
      {data.map((item, index) => (
        <Pressable key={index.toString()} style={styles.storyItem}>
          <FastImage
            style={styles.image}
            source={item.user}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={{color: 'white'}}>{item.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Stories;

const styles = StyleSheet.create({
  storiesContainer: {
    flexDirection: 'row',
    marginTop: 10,
    height: 100,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#e41a6e',
  },
});
