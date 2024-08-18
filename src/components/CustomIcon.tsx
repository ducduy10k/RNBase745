import {createIconSetFromIcoMoon} from 'react-native-vector-icons';

import icoMoonConfig from '../../selection.json';

import {default as IconAD} from 'react-native-vector-icons/AntDesign';
import {default as IconFA} from 'react-native-vector-icons/FontAwesome';
import {default as IconFA6} from 'react-native-vector-icons/FontAwesome6';
import {default as IconMCI} from 'react-native-vector-icons/MaterialCommunityIcons';
import {default as IconF} from 'react-native-vector-icons/Fontisto';
import {default as IconO} from 'react-native-vector-icons/Octicons';
import {default as IconI} from 'react-native-vector-icons/Ionicons';
import {IconProps} from 'react-native-vector-icons/Icon';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export type LibCustomIconType =  'Ant' | 'Awesome' | 'Awesome6' | 'MaterialCommunity' | 'Octicons' | 'Fontisto' | 'Ionicons' ;

interface GradientBgIcon {
  gradientColors?: string[];
  gradientStyle?: StyleProp<ViewStyle> | undefined;
}

type CustomIconProps = IconProps & {
  lib?: LibCustomIconType;
  isGradient?: boolean;
  onPress?: () => void;
} & GradientBgIcon;

const GradientWrapper = ({
  children,
  gradientColors,
  gradientStyle,
}: {
  children: React.ReactNode;
} & GradientBgIcon) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={gradientColors || []}
      style={gradientStyle}>
      {children}
    </LinearGradient>
  );
};

export const getIcon = ({
  lib,
  ...props
}: IconProps & {
  lib?: LibCustomIconType;
}): React.ReactNode => {
  switch (lib) {
    case 'Ant':
      return <IconAD {...props}/>;
    case 'Awesome': {
      return <IconFA {...props} />;
    }
    case 'Awesome6': {
      return <IconFA6 {...props} />;
    }
    case 'MaterialCommunity': {
      return <IconMCI {...props} />;
    }
    case 'Octicons': {
      return <IconO {...props} />;
    }
    case 'Fontisto': {
      return <IconF {...props} />;
    }
    case 'Ionicons': {
      return <IconI {...props} />;
    }
    default:
      const DefaultIcon = createIconSetFromIcoMoon(icoMoonConfig);
      return (
        <DefaultIcon {...props} />
      );
  }
};

export const CustomIcon = (props: CustomIconProps): React.ReactNode => {
  const {isGradient, gradientColors, gradientStyle} = props;
  return isGradient ? (
    <GradientWrapper
      gradientColors={gradientColors}
      gradientStyle={gradientStyle}>
      {getIcon(props)}
    </GradientWrapper>
  ) : (
    getIcon(props)
  );
};

export default CustomIcon;
