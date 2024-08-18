import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomIcon from '../../../components/CustomIcon'

interface HomeSearchProps {
    onClose: () => void
}

const HomeSearch = ({onClose}: Partial<HomeSearchProps>) => {
  return (
    <View>
      <Text>Search</Text>
      <Pressable onPress={onClose}>
        <CustomIcon name='close' lib='Ant' size={30}/>
      </Pressable>
    </View>
  )
}

export default HomeSearch

const styles = StyleSheet.create({})