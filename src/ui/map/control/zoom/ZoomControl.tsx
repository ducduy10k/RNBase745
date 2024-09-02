import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Mapbox from '@rnmapbox/maps';
import CustomIcon from '../../../../components/CustomIcon';

interface ZoomControlProps {
    mapCamera?: Mapbox.Camera | null;
    map: Mapbox.MapView;
  }
const ZoomControl = ({mapCamera, map}: ZoomControlProps) => {

    const handleZoomIn = async () => {
        const zoom = await map.getZoom();
        if (mapCamera) {
            mapCamera.zoomTo(zoom + 1)
        }
    }

    const handleZoomOut = async () => {
        const zoom = await map.getZoom();
        if (mapCamera) {
            mapCamera.zoomTo(zoom + 1)
        }
    }
  return (
<View style={styles.controlWrapper}>

<Pressable onPress={() => handleZoomIn()}>
      <View >
      <CustomIcon name="download" lib="Ant" size={16} />
      </View>
    </Pressable>

<Pressable onPress={() => handleZoomOut()}>
      <View >
      <CustomIcon name="download" lib="Ant" size={16} />
      </View>
    </Pressable>
</View>

  )
}

export default ZoomControl


const styles = StyleSheet.create({
  controlWrapper: {
    width: 40,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
