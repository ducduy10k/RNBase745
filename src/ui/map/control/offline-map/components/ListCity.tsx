import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import * as citys from '../../../../../data/vn.json';
import CityMapOfflineItem from './CityMapOfflineItem';
import CustomIcon from '../../../../../components/CustomIcon';
import Mapbox from '@rnmapbox/maps';
import OfflinePack from '@rnmapbox/maps/lib/typescript/src/modules/offline/OfflinePack';

interface ListCityProps {
  onClose: () => void
}
const ListCity = ({onClose}: ListCityProps) => {
   Mapbox.offlineManager.getPacks().then((packs: OfflinePack[]) => {
    console.log(packs);
    
   })
  return (
    <ScrollView>
      <View>
        <Text style={styles.header}>Bản đồ ngoại tuyến</Text>
        <Pressable onPress={() => onClose()}>
        <Text style={styles.header}>Đóng</Text>

        </Pressable>
      </View>
      <View>
        {(citys as any).features.map((city: any, index: number) => {
          return  <CityMapOfflineItem key={index} city={city} /> })}
       
      </View>
    </ScrollView>
  );
};

export default ListCity;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    padding: 10
  },
});
