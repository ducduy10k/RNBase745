import {Linking, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import ProfilePic from '../components/ProfilePic';
import {
  Camera,
  useCameraDevices,
  useCameraDevice,
} from 'react-native-vision-camera';
import CameraScreen from './CameraScreen';

const ProfileScreen = () => {
  const [isOpenCamera, setIsOpenCamera] = useState(false);

  return (
    <View style={styles.container}>
       <Modal visible={isOpenCamera} animationType="slide">
          <CameraScreen />
        </Modal>
      <View>
        <Pressable onPress={() => setIsOpenCamera(true)}>
          <ProfilePic />
        </Pressable>
        <Text>D Code</Text>
      </View>
      <View></View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
