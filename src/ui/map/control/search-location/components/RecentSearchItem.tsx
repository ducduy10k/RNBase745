import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export interface RecentSearchItemI {
  id: string;
  icon: string;
  addressLine: string;
  cityCode: string;
  cityName: string;
  districtCode: string;
  districtName: string;
  wardCode: string;
  wardName: string;
}
interface RecentSearchItemProps {
  item: RecentSearchItemI;
  onPress: () => void;
}

const RecentSearchItem = ({item, onPress}: RecentSearchItemProps) => {
  return (
    <View>
      <Text>RecentSeatchItem</Text>
    </View>
  )
}

export default RecentSearchItem

const styles = StyleSheet.create({})