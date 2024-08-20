import React, {useRef, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import CustomIcon from '../components/CustomIcon';
import {
  CameraProps,
  CameraRef,
} from '@rnmapbox/maps/lib/typescript/src/components/Camera';
Mapbox.setAccessToken(
  'sk.eyJ1IjoiYmV0YXBjaG9pMTBrIiwiYSI6ImNsd2o1cGRmcTBxZGsyaXBmd2J2emRwc28ifQ.sg6Y6R2AWkqU5v0HwXHCyQ',
);

interface MapboxScreenProps {
  navigation: any;
}

const MapboxScreen: React.FC<MapboxScreenProps> = ({navigation}) => {
  let cameraRef = useRef<CameraRef | null>(null);
  const [mapCameraState, setMapCameraState] = useState<CameraProps>({
    centerCoordinate: [105.80946796710893, 21.02346518415829],
    zoomLevel: 16,
    followUserLocation: true,
    padding: {
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10,
    },
    animationDuration: 1000,
  });
  const backHandler = () => {
    navigation.pop();
  };

  return (
    <View style={styles.page}>
      <Mapbox.MapView
        style={styles.map}
        styleURL={'mapbox://styles/mapbox/streets-v12'}
        testID={'mapbox'}>
        <Mapbox.Camera
          ref={ref => (cameraRef.current = ref)}
          defaultSettings={mapCameraState}
          ></Mapbox.Camera>
      </Mapbox.MapView>
      <View style={styles.backBtn}>
        <TouchableOpacity onPress={() => backHandler()}>
          <CustomIcon name="left" lib="Ant" size={16} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapboxScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    width: '100%',
    height: Dimensions.get('window').height,
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 5,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#c1c1c1',
    backgroundColor: '#ccc',
  },
});
