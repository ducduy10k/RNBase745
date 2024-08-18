import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
// import Mapbox from '@rnmapbox/maps';
import CustomIcon from '../components/CustomIcon';
// Mapbox.setAccessToken(
//   'sk.eyJ1IjoiYmV0YXBjaG9pMTBrIiwiYSI6ImNsd2o1cGRmcTBxZGsyaXBmd2J2emRwc28ifQ.sg6Y6R2AWkqU5v0HwXHCyQ',
// );

interface MapboxScreenProps {
  navigation: any;
}

const MapboxScreen: React.FC<MapboxScreenProps> = ({navigation}) => {
  const backHandler = () => {
    navigation.pop();
  };
  return (
    <View style={styles.page}>
      {/* <Mapbox.MapView
        style={styles.map}
        styleURL={'mapbox://styles/mapbox/streets-v12'}
        testID={'mapbox'}>
      </Mapbox.MapView> */}
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
