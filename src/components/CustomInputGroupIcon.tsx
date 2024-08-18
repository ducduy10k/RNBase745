import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import CustomIcon, {LibCustomIconType} from './CustomIcon';
import Colors from '../constants/color.constant';

export interface IconOption {
  name: string;
  size: number;
  color: string;
  style: StyleProp<ViewStyle> | undefined;
  lib: LibCustomIconType;
}

interface CustomInputGroupProps {
  iconLeft: Partial<IconOption>;
  iconRight: Partial<IconOption>;
  placeholder: string;
  value: string;
  style: StyleProp<ViewStyle> | undefined;
  onChangeText: (text: string) => void;
  props: TextInputProps;
  inputRef: React.LegacyRef<TextInput> | undefined;
  invalid: boolean;
}

const CustomInputGroupIcon: React.FC<Partial<CustomInputGroupProps>> = ({
  placeholder,
  iconLeft,
  iconRight,
  value,
  onChangeText,
  style,
  props,
  inputRef,
  invalid,
}) => {
  return (
    <View style={[styles.container, invalid && styles.invalidInput, style]}>
      {iconLeft ? (
        <CustomIcon
          name={iconLeft.name || ''}
          lib={iconLeft.lib}
          color={iconLeft.color}
          size={iconLeft.size}
          style={iconLeft.style}
        />
      ) : (
        <></>
      )}
      <TextInput
        ref={inputRef}
        {...props}
        style={[styles.input]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      {iconRight ? (
        <CustomIcon
          name={iconRight.name || ''}
          lib={iconRight.lib}
          color={iconRight.color}
          size={iconRight.size}
          style={iconRight.style}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default CustomInputGroupIcon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
  },
  invalidInput: {
    borderColor: Colors.dangerColor,
    borderWidth: 1,
  },
});
