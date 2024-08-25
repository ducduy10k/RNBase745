import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomIcon from '../../../components/CustomIcon';
import Mapbox from '@rnmapbox/maps';
import Colors from '../../../constants/color.constant';
import Geolocation from '@react-native-community/geolocation';

type GeolocationStatusType =
  | 'unavailable'
  | 'crosshairs'
  | 'crosshairsGps'
  | 'compass';
interface GeoLocateControlProps {
  defaultStatus: GeolocationStatusType;
  onPress?: () => void;
  mapCamera?: Mapbox.Camera | null;
}
const GeoLocateControl = ({
  onPress,
  mapCamera,
  defaultStatus,
}: GeoLocateControlProps) => {
  const [isProcess, setIsProcess] = useState(false);
  const [geolocateStatus, setGeolocateStatus] =
    useState<GeolocationStatusType>(defaultStatus);
  const handleCompass = () => {
    if (onPress) onPress();
  };
  const handleCrosshairsGPS = () => {
    if (onPress) onPress();
    if (isProcess) return;
    const options: {
      timeout?: number;
      maximumAge?: number;
      enableHighAccuracy?: boolean;
    } = {
      timeout: 5000,
      maximumAge: 0,
      enableHighAccuracy: true,
    };
    setIsProcess(true);
    Geolocation.getCurrentPosition(
      (position: {
        coords: {
          latitude: number;
          longitude: number;
          altitude: number | null;
          accuracy: number;
          altitudeAccuracy: number | null;
          heading: number | null;
          speed: number | null;
        };
        timestamp: number;
      }) => {
        mapCamera?.setCamera({
          centerCoordinate: [
            position.coords.longitude,
            position.coords.latitude,
          ],
          zoomLevel: 15,
          animationMode: 'flyTo',
          animationDuration: 1000,
        });
        setTimeout(() => {
          setIsProcess(false);
        }, 1000);
      },
      (error: {
        code: number;
        message: string;
        PERMISSION_DENIED: number;
        POSITION_UNAVAILABLE: number;
        TIMEOUT: number;
      }) => {
        console.log(error);
        setIsProcess(false);
      },
    );
  };
  const handleCrosshairs = () => {
    if (onPress) onPress();
    if (isProcess) return;
    const options: {
      timeout?: number;
      maximumAge?: number;
      enableHighAccuracy?: boolean;
    } = {
      timeout: 5000,
      maximumAge: 0,
      enableHighAccuracy: true,
    };
    setIsProcess(true);
    Geolocation.getCurrentPosition(
      (position: {
        coords: {
          latitude: number;
          longitude: number;
          altitude: number | null;
          accuracy: number;
          altitudeAccuracy: number | null;
          heading: number | null;
          speed: number | null;
        };
        timestamp: number;
      }) => {
        mapCamera?.setCamera({
          centerCoordinate: [
            position.coords.longitude,
            position.coords.latitude,
          ],
          zoomLevel: 15,
          animationMode: 'flyTo',
          animationDuration: 1000,
        });
        setTimeout(() => {
          setIsProcess(false);
        }, 1000);
      },
      (error: {
        code: number;
        message: string;
        PERMISSION_DENIED: number;
        POSITION_UNAVAILABLE: number;
        TIMEOUT: number;
      }) => {
        console.log(error);
        setIsProcess(false);
      },
    );
  };

  const renderUI = () => {
    switch (geolocateStatus) {
      case 'unavailable':
        return (
          <CustomIcon
            name="crosshairs-off"
            lib="MaterialCommunity"
            size={28}
            color={Colors.primaryColor}
          />
        );
      case 'crosshairs':
        return (
          <CustomIcon
            name="crosshairs"
            lib="MaterialCommunity"
            size={28}
            color={Colors.primaryColor}
            onPress={() => handleCrosshairs()}
          />
        );
      case 'crosshairsGps':
        return (
          <CustomIcon
            name="crosshairs-gps"
            lib="MaterialCommunity"
            size={28}
            color={Colors.primaryColor}
            onPress={() => handleCrosshairsGPS()}
          />
        );
      case 'compass':
        return (
          <CustomIcon
            name="compass"
            lib="MaterialCommunity"
            size={28}
            color={Colors.primaryColor}
            onPress={() => handleCompass()}
          />
        );

      default:
        return (
          <CustomIcon
            name="compass"
            lib="MaterialCommunity"
            size={28}
            color={Colors.primaryColor}
            onPress={() => handleCompass()}
          />
        );
    }
  };
  console.log(geolocateStatus);
  
  return renderUI();
};

export default GeoLocateControl;

const styles = StyleSheet.create({});
