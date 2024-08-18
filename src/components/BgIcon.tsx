import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import CustomIcon from './CustomIcon';

interface BgIconProps {
    bgColor: string;
    iconName: string;
    size?: number;
    iconColor: string;
    iconStyle?: StyleProp<ViewStyle> | undefined;
    bgStyle?: StyleProp<ViewStyle> | undefined;
    lib?: 'Ant' | 'Awesome' | 'MaterialCommunity';
}

const BgIcon: React.FC<BgIconProps> = ({
    iconName,
    iconColor,
    size,
    iconStyle,
    bgStyle,
    lib,
    bgColor
}) => {
  return (
    <View style={[styles.bgIconDefault, bgStyle, {
        backgroundColor: bgColor,
    }]}>
      <CustomIcon name={iconName} color={iconColor} size={size || 18} style={iconStyle} lib={lib} isGradient={false}/>
    </View>
  )
}

const styles = StyleSheet.create({
    bgIconDefault: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
    }
})
export default BgIcon
