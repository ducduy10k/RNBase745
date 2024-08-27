import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RecentSearchItem, { RecentSearchItemI } from './RecentSearchItem'


interface RecentSearchListProps {
    items: RecentSearchItemI[]
}

const RecentSearchList = ({items}: RecentSearchListProps) => {
  return (
    <View>
        {
            items.map(item => <RecentSearchItem key={item.id} item={item} onPress={() => {}}/>)
        }
    </View>
  )
}

export default RecentSearchList

const styles = StyleSheet.create({})