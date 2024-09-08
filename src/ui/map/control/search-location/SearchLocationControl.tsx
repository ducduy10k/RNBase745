import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomIcon from '../../../../components/CustomIcon';
import SearchLocationComponent from './components/SearchLocationComponent';
import { RecentSearchItemI } from './components/RecentSearchItem';
import { CameraRef } from '@rnmapbox/maps/lib/typescript/src/components/Camera';
import Mapbox from '@rnmapbox/maps';

interface SearchLocationControlProps {
  mapCamera?: Mapbox.Camera | null;
  onSearch: (item: RecentSearchItemI) => void
}

const SearchLocationControl = ({mapCamera, onSearch}: SearchLocationControlProps) => {
  const [isModalSearchOpen, setIsModalSearchOpen] = useState(false);
  
  const handlePress = (item: RecentSearchItemI) => {
    // Handle press event on recent search item
    console.log(`Pressed on recent search item: ${item.text}`);
    setIsModalSearchOpen(false); // Close modal when pressed
    mapCamera?.setCamera({
      centerCoordinate: [
        item.feature.properties.coordinates.longitude,
        item.feature.properties.coordinates.latitude,
      ],
      zoomLevel: 15,
      animationMode: 'flyTo',
      animationDuration: 1000,
      pitch: 0,
      heading: 0,
    });
    onSearch(item);

  }

  return (
    <Pressable onPress={() => setIsModalSearchOpen(true)}>
      <View style={styles.controlWrapper}>
        <Modal visible={isModalSearchOpen} animationType="slide">
          <SearchLocationComponent onBack={() => setIsModalSearchOpen(false)} onPress={(item: RecentSearchItemI) => handlePress(item)}/>
        </Modal>
        <CustomIcon name="search1" lib="Ant" size={16} />
      </View>
    </Pressable>
  );
};

export default SearchLocationControl;

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
