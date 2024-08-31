import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import * as citys from '../../../../../data/vn.json';
import CityMapOfflineItem from './CityMapOfflineItem';

const ListCity = () => {
  
  return (
    <ScrollView>
      <View>
        <Text style={styles.header}>Bản đồ ngoại tuyến</Text>
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
