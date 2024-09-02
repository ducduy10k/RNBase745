import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Mapbox from '@rnmapbox/maps';
import CustomIcon from '../../../../components/CustomIcon';
import Colors from '../../../../constants/color.constant';

interface ZoomControlProps {
    mapCamera?: Mapbox.Camera | null;
    map: Mapbox.MapView;
  }
const ZoomControl = ({mapCamera, map}: ZoomControlProps) => {

    const handleZoomIn = async () => {
        const zoom = await map.getZoom();
        if (mapCamera) {
            mapCamera.zoomTo(zoom + 0.5, 300)
        }
    }

    const handleZoomOut = async () => {
        const zoom = await map.getZoom();
        if (mapCamera) {
            mapCamera.zoomTo(zoom - 0.5, 300)
        }
    }
  return (
<View style={styles.controlWrapper}>

<Pressable onPress={() => handleZoomIn()} style={[styles.control, styles.firstControl]}>
      <CustomIcon name="plus" lib="Ant" size={16} />
    </Pressable>

<Pressable onPress={() => handleZoomOut()} style={styles.control}>
      <CustomIcon name="minus" lib="Ant" size={16} />
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
  control: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  firstControl: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray300
  }
});
