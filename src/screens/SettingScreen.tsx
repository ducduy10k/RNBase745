import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/color.constant';
import CustomIcon from '../components/CustomIcon';
import ProfilePic from '../components/ProfilePic';

interface SettingScreenProps {
  navigation: any;
}
const SettingScreen = ({navigation}: SettingScreenProps) => {
  const {logout} = useContext(AuthContext);
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    if (logout) logout();
  };
  const handleViewProfile = () => {
    navigation.push('Profile');
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.profile}>
        <View>
          <ProfilePic />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>D Code</Text>
          <Text style={styles.profileDescription}>Thay đổi thông tin cá nhân</Text>
        </View>
        <View style={styles.iconAction}>
        <Pressable onPress={() => handleViewProfile()}>
          <CustomIcon name="right" lib="Ant" size={16}/>
        </Pressable>
        </View>
      </View>
      <CustomButton
        label="Logout"
        color={Colors.gray600}
        bgColor="white"
        onPress={handleLogout}
      />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  profile: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 10,
  },
  profileInfo: {
    flexDirection: 'column',
    marginHorizontal: 10,
    flex: 1,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  profileDescription: {
    fontSize: 12
  },
  iconAction: {
    justifyContent: 'center',
  },
  signUpBtn: {
    flex: 1,
  },
});
