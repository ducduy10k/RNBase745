import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import ProfilePic from './ProfilePic';
import CustomIcon from './CustomIcon';
import FontSize from '../constants/font-size.constant';

interface HeaderBarProps {
  title: string;
  onSearchPress: () => void;
  onShowCartPress: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({title, onSearchPress, onShowCartPress}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.iconGradientWrapper}>
        <CustomIcon
          name="appstore-o"
          lib="Ant"
          size={20}
          isGradient={true}
          gradientColors={['white', '#faf5f5']}
          gradientStyle={styles.iconGradient}
        />
      </View>
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.rightToolbar}>
        <Pressable android_ripple={{color: '#dddddd'}} onPress={onSearchPress}>
          <CustomIcon
            name="search1"
            lib="Ant"
            size={26}
            isGradient={false}
          />
        </Pressable>
        <Pressable android_ripple={{color: '#dddddd'}} onPress={onShowCartPress}>
          <CustomIcon
            name="shoppingcart"
            lib="Ant"
            size={26}
            isGradient={false}
          />
        </Pressable>
        <ProfilePic />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 8
  },
  headerText: {
    fontSize: FontSize.header,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  rightToolbar: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  iconGradientWrapper: {
    borderWidth: 2,
    borderColor: '#faf5f5',
    borderRadius: 12,
    justifyContent: 'center',
    alignContent: 'center',
    overflow: 'hidden',
  },
  iconGradient: {
    height: 34,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HeaderBar;
