import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const BottomTab = ({icons}) => {
  const navigation = useNavigation();

  const [active, setIsActive] = useState(true);

  const Icons = ({icon}) => {
    const handleOnPress = () => {
      setIsActive(icon.name);
      if (icon.name === 'add') {
        navigation.navigate('NewPostScreen');
      }
    };

    return (
      <TouchableOpacity onPress={handleOnPress}>
        <Image
          style={[styles.icon, icon.name === 'profile' ? styles.profile : null]}
          source={active === icon.name ? icon.active : icon.inactive}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {icons.map((icon, index) => (
        <Icons key={index.toString()} icon={icon} />
      ))}
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40,
    alignItems: 'center',
    paddingTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  profile: {
    borderRadius: 15,
  },
});
