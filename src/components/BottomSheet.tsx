import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../constants/color.constant'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import Animated, { useSharedValue } from 'react-native-reanimated'
const {height: SCREEN_HEIGHT} = Dimensions.get('window')

const BottomSheet = () => {
    const translateY = useSharedValue(0);
    const gesture = Gesture.Pan().onUpdate((e) => {
        console.log(e);

    });
   
  return (
    <GestureDetector gesture={gesture}>
        <Animated.View style={styles.bottomSheetContainer}>
            <View style={styles.line}>

            </View>
        </Animated.View>
    </GestureDetector>
  )
}

export default BottomSheet

const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
        top: SCREEN_HEIGHT / 1.5,
        borderRadius: 25 
    },
    line: {
        width: 75,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.gray400,
        marginVertical: 10,
        alignSelf: 'center'
    }
})