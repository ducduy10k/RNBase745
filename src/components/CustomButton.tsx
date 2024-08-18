import {
  Dimensions,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {IconOption} from './CustomInputGroupIcon';
import CustomIcon from './CustomIcon';

interface CustomButtonProps {
  iconPrefix?: Partial<IconOption>;
  iconSubfix?: Partial<IconOption>;
  label: string;
  color: string;
  bgColor: string;
  style: StyleProp<ViewStyle> | undefined;
  onPress: (event: any) => any;
}

const CustomButton: React.FC<Partial<CustomButtonProps>> = ({
  iconPrefix,
  iconSubfix,
  label,
  bgColor,
  color,
  style,
  onPress,
}) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => pressed && styles.btnPress}>
        <View
          style={[styles.customButtonContainer, {backgroundColor: bgColor}]}>
          {iconPrefix ? (
            <CustomIcon
              name={iconPrefix.name || ''}
              lib={iconPrefix.lib}
              color={iconPrefix.color}
              size={iconPrefix.size}
              style={iconPrefix.style}
            />
          ) : (
            <></>
          )}
          <Text
            style={[
              styles.text,
              {
                color,
              },
            ]}>
            {label}
          </Text>
          {iconSubfix ? (
            <CustomIcon
              name={iconSubfix.name || ''}
              lib={iconSubfix.lib}
              color={iconSubfix.color}
              size={iconSubfix.size}
              style={iconSubfix.style}
            />
          ) : (
            <></>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  customButtonContainer: {
    padding: Dimensions.get('window').width <=  360 ? 10 : 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 5,
  },
  btnPress: {
    opacity: 0.8,
  },
  text: {
    fontWeight: 'bold',
  },
});
