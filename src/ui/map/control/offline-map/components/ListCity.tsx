import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import * as citys from '../../../../../data/vn.json';

const ListCity = () => {
  return (
    <>
      <View>
        <Text>Bản đồ ngoại tuyến</Text>
      </View>
      <View>
        {(citys as any).features.map((city: any, index: number) => {
          return <Text key={index}>{city.properties.ten_tinh}</Text>;
        })}
      </View>
    </>
  );
};

export default ListCity;

const styles = StyleSheet.create({});
