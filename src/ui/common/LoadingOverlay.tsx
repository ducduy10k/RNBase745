import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
        <ActivityIndicator size={'large'} />
    </View>
  )
}

export default LoadingOverlay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 24
    }
})