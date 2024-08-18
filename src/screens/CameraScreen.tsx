import {Alert, BackHandler, Linking, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraDevices,
  useCameraFormat,
} from 'react-native-vision-camera';
import PictureResult from '../ui/camera/PictureResult';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import CustomIcon from '../components/CustomIcon';

interface CameraScreenProps {
  navigation: any;
}

const CameraScreen = ({navigation}: CameraScreenProps) => {
  const [isOpenPhotoResult, setIsOpenPhotoResult] = useState(false);
  const [photo, setPhoto] = useState<any>();
  const cameraRef = useRef<Camera>(null);
  // Camera
  const devices = useCameraDevices();
  const device = useCameraDevice('front');

  useEffect(() => {
    requestCameraPremission();
  }, []);

  // Camrera handler
  const requestCameraPremission = useCallback(async () => {
    const cameraPremission = await Camera.requestCameraPermission();
    if (cameraPremission === 'denied') {
      await Linking.openSettings();
    } else {
      console.log('Camera permission granted.');
    }
  }, []);
  if (device == null) {
    return <Text>No camera available</Text>;
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current == null) {
      return;
    }
    const photo = await cameraRef.current?.takePhoto();
    console.log('photo:', photo);
    setPhoto(photo);
    setIsOpenPhotoResult(true);
  };
  const format = useCameraFormat(device, [
    { photoResolution: { width: 720, height: 1280 } }
  ]);

 
  return (
    <View style={styles.container}>
      <Modal visible={isOpenPhotoResult} animationType="slide">
        <PictureResult photo={photo} onClose={() => {
          setPhoto(null);
          setIsOpenPhotoResult(false);
        }}/>
      </Modal>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
        format={format}
        enableZoomGesture></Camera>
        <View style={styles.topLeftControl}>
        <Pressable onPress={() => handleTakePhoto()}>
          <CustomIcon name='arrowleft' lib='Ant' color={'white'} size={32} onPress={() => navigation.push('Profile')}/>
        </Pressable>
      </View>
      <View style={styles.footerAction}>
        <Pressable onPress={() => handleTakePhoto()}>
          <View style={styles.btnSelfie}></View>
        </Pressable>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    position: 'relative',
  },
  footerAction: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  topLeftControl: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  btnSelfie: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
