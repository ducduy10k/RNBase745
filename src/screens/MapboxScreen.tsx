import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import {UserLocation} from '@rnmapbox/maps';
import CustomIcon from '../components/CustomIcon';
import {
  CameraRef,
  CameraStop,
} from '@rnmapbox/maps/lib/typescript/src/components/Camera';
import Geolocation from '@react-native-community/geolocation';
import GeoLocateControl from '../ui/map/control/geolocate/GeoLocateControl';
import {Text} from '@rneui/base';
import {generateString} from '../utils/common';
import SearchLocationControl from '../ui/map/control/search-location/SearchLocationControl';
import OfflineMapControl from '../ui/map/control/offline-map/OfflineMapControl';
import ZoomControl from '../ui/map/control/zoom/ZoomControl';
Mapbox.setAccessToken(
  'sk.eyJ1IjoiYmV0YXBjaG9pMTBrIiwiYSI6ImNsd2o1cGRmcTBxZGsyaXBmd2J2emRwc28ifQ.sg6Y6R2AWkqU5v0HwXHCyQ',
);

interface MapboxScreenProps {
  navigation: any;
}

const MapboxScreen: React.FC<MapboxScreenProps> = ({navigation}) => {
  let cameraRef = useRef<CameraRef | null>(null);
  let mapRef = useRef<Mapbox.MapView | null>(null);
  const [isCameraInit, setIsCameraInit] = useState(false);
  const [havePermission, setHavePermission] = useState<boolean>(false);
  const [mapCameraState, setMapCameraState] = useState<CameraStop>({
    centerCoordinate: [105.80946796710893, 21.02346518415829],
    zoomLevel: 16,
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

  useEffect(() => {
    requestMapPremission().then(() => {
      setHavePermission(true);
    });
  }, []);

  function requestMapPremission() {
    return new Promise((resolve, reject) => {
      Geolocation.requestAuthorization(() => {
        resolve(true);
      }, reject);
    });
  }

  return (
    <View style={styles.page}>
      <Mapbox.MapView
        ref={mapRef}
        scaleBarEnabled={false}
        style={styles.map}
        styleURL={'mapbox://styles/mapbox/streets-v12'}
        testID={'mapbox'}
        rotateEnabled={true}>
        <Mapbox.Camera
          ref={ref => {
            cameraRef.current = ref;
            if (ref) {
              setIsCameraInit(true);
            }
          }}
          // followUserLocation={true}
          // defaultSettings={mapCameraState}
        ></Mapbox.Camera>
        {havePermission && (
          <UserLocation
            animated
            minDisplacement={10}
            androidRenderMode="compass"
            requestsAlwaysUse={true}
            visible={true}
          />
        )}
      </Mapbox.MapView>
      <View style={styles.backBtn}>
        <TouchableOpacity onPress={() => backHandler()}>
          <CustomIcon name="left" lib="Ant" size={16} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.btnControlTopRight}>
        {cameraRef.current && <SearchLocationControl mapCamera={cameraRef.current} />}
        {mapRef.current && <OfflineMapControl map={mapRef.current} />}
      </View>

      <View style={styles.btnControlBottomRight}>
      {mapRef.current && <ZoomControl map={mapRef.current}  mapCamera={cameraRef.current} />}
        <GeoLocateControl
          key={generateString(5)}
          mapCamera={cameraRef.current}
          defaultStatus={
            !havePermission || !isCameraInit ? 'unavailable' : 'crosshairsGps'
          }
        />
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
    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height,
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 5,
  },
  btnControlTopRight: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    padding: 5,
    gap: 5,
  },
  btnControlBottomRight: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
    padding: 5,
  },
});
