import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProfilePic = () => {
  return (
    <View style={styles.profilePicContainer}>
      <Image
        style={styles.avatar}
        source={require('../assets/images/avatarmin.png')}
      />
    </View>
  );
};

export default ProfilePic;

const styles = StyleSheet.create({
  profilePicContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderColor: '#faf5f5',
    borderWidth: 1
  },
  avatar: {
    width: 36,
    height: 36,
  },
});
