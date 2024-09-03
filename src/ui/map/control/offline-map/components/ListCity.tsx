import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import * as citys from '../../../../../data/vn.json';
import CityMapOfflineItem from './CityMapOfflineItem';
import CustomIcon from '../../../../../components/CustomIcon';
import Mapbox from '@rnmapbox/maps';
import OfflinePack from '@rnmapbox/maps/lib/typescript/src/modules/offline/OfflinePack';

interface ListCityProps {
  onClose: () => void
}
const ListCity = ({onClose}: ListCityProps) => {
    const [packs, setPacks] = useState<OfflinePack[]>();
    const [loadingPacks, setLoadingPacks] = useState(false)
    useEffect(() => {
      
    }, [])   
    function getPacks() {
      setLoadingPacks(true);
      Mapbox.offlineManager.getPacks().then((packs: OfflinePack[]) => {
        setPacks(packs)
       }).finally(() => {
        setLoadingPacks(false);
       })
    }
   useLayoutEffect(() => {
        getPacks()
   }, [])

   return (
    <ScrollView>
      <View style={styles.headerWrapper}>
      <Pressable onPress={() => onClose()}>
          <CustomIcon name='left' lib="Ant" size={28}/>
        </Pressable>
        <Text style={styles.header}>Bản đồ ngoại tuyến</Text>
        
      </View>
      <View>
        {(citys as any).features.map((city: any, index: number) => {
          return  <CityMapOfflineItem key={index} city={city} defaultPack={packs?.find((pack)=> pack.name == 'offline_'+city.properties.gid)}/> })}
       
      </View>
    </ScrollView>
  );
};

export default ListCity;

const styles = StyleSheet.create({

  headerWrapper: {
    flexDirection: "row",
    alignItems: 'center'
  },
  header: {
    fontSize: 20,
    padding: 10
  },
});
