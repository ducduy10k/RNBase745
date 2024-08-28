import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomIcon, { LibCustomIconType } from '../../../../../components/CustomIcon';

export interface RecentSearchItemI {
  id: string;
  icon: string;
  lib: LibCustomIconType;
  addressLine?: string;
  cityCode?: string;
  cityName?: string;
  districtCode?: string;
  districtName?: string;
  wardCode?: string;
  wardName?: string;
  text: string;
  deleteable?: boolean;
}
interface RecentSearchItemProps {
  item: RecentSearchItemI;
  onPress: () => void;
  onDelete: () => void;
}

const RecentSearchItem = ({item, onPress, onDelete}: RecentSearchItemProps) => {
  return (
    <View style={styles.recentItemWrapper}>
      <View style={styles.recentItemIconWrapper}>
        <CustomIcon name={item.icon} lib={item.lib || 'Ant'} size={18}/>
      </View>
      <View style={styles.recentItemTextWrapper}>
        <Text style={styles.recentItemText}>{item.text}</Text>
      </View>
      {
        item.deleteable && (
          <View style={styles.recentItemDeleteWrapper}>
            <CustomIcon name="close" lib="Ant" size={18} onPress={onDelete}/>
          </View>
        )
      }
    </View>
  )
}

export default RecentSearchItem

const styles = StyleSheet.create({
  recentItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginLeft: 10,
  },
  recentItemIconWrapper: {
    marginRight: 10
  },
  recentItemTextWrapper: {
    flex: 1
  },
  recentItemText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  recentItemDeleteWrapper: {
    marginLeft: 10
  }
})