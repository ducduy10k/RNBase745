import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomIcon from '../../../../components/CustomIcon';
import Mapbox from '@rnmapbox/maps';

interface OfflineMapControlProps {
  map: Mapbox.MapView;
}

const OfflineMapControl = ({map}: OfflineMapControlProps) => {
  const handleDownload = async () => {
    const bounds = await map.getVisibleBounds();
    console.log(bounds);
    const progressListener = (offlineRegion: any, status: any) =>
      console.log('done: ', offlineRegion, status);
    const errorListener = (offlineRegion: any, err: any) =>
      console.log('error: ', offlineRegion, err);
    console.log(map);
    const offlinePack = await Mapbox.offlineManager.getPack('offlinePack');
    if (offlinePack) {
      await Mapbox.offlineManager.deletePack('offlinePack');
    }
    await Mapbox.offlineManager.createPack(
      {
        name: 'offlinePack',
        styleURL: 'mapbox://styles/mapbox/streets-v12',
        minZoom: 14,
        maxZoom: 20,
        bounds: [[106.6973376145533, 10.7791546909693], [106.70357106825233, 10.77426430960464]],
      },
      progressListener,
      errorListener,
    );
  };
  return (
    <Pressable onPress={() => handleDownload()}>
      <View style={styles.controlWrapper}>
        <CustomIcon name="download" lib="Ant" size={16} />
      </View>
    </Pressable>
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
