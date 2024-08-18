import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomIcon from '../../components/CustomIcon';
interface PictureResultProps {
  photo: any;
  onClose: () => void;
}
const PictureResult = ({photo, onClose}: PictureResultProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftControl}>
        <CustomIcon name='closecircleo' lib='Ant' isGradient={false} size={32} onPress={onClose}/>
      </View>
      {
        photo && photo.path ? (
          <Image style={styles.picture} source={{uri: `file://${photo.path}` }}  />
        ) : (
          <Text>No image selected</Text>
        ) // If no photo, display a message.
      }
    </View>
  );
};

export default PictureResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picture: {
    flex: 1,
    // transform: [{rotate: '90deg'}]
  },
  leftControl:{
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    borderRadius: 10,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }
});
