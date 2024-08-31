import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import CustomIcon from '../../../../components/CustomIcon';
import Mapbox from '@rnmapbox/maps';
import ListCity from './components/ListCity';

interface OfflineMapControlProps {
  map: Mapbox.MapView;
}

const OfflineMapControl = ({map}: OfflineMapControlProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <Modal visible={isModalOpen} animationType="slide">
        <ListCity />
      </Modal>
      <Pressable onPress={() => setIsModalOpen(true)}>
            <View style={styles.controlWrapper}>
              <CustomIcon name="download" lib="Ant" size={16} />
            </View>
          </Pressable>
    </>
  );
};

export default OfflineMapControl;

const styles = StyleSheet.create({
  controlWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
