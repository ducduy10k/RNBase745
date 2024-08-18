import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OrderHistory from '../screens/OrderHistory';
import CustomIcon, {getIcon} from '../components/CustomIcon';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();
interface TabNavigatorProps {
  navigation: any;
}
const TabNavigator = ({navigation}: TabNavigatorProps) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        // tabBarBackground() {
        //    return <StyledBlurView overlayColor='dark' blurAmount={15} className='absolute top-0 bottom-0 left-0 right-0'/>
        // },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return getIcon({
              name: 'home',
              lib: 'MaterialCommunity',
              color: focused ? 'red' : 'black',
              size: 25,
            });
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoritesScreen}
        options={{
          headerShown: true,
          title: 'Yêu thích',
          tabBarIcon: ({focused, color, size}) => {
            return getIcon({
              name: 'heart',
              lib: 'Ant',
              color: focused ? 'red' : 'black',
              size: 25,
            });
          },
          headerRight: ({tintColor}) => {
            return (
              <View style={{
                marginRight: 10
              }}>
                <TouchableOpacity
                  style={{paddingLeft: 10}}
                  onPress={() => {
                    navigation.push('Chat')
                  }}>
                  <CustomIcon
                    name="chatbubble-ellipses-outline"
                    lib="Ionicons"
                    size={26}
                    color={tintColor}
                  />
                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
      <Tab.Screen
        name="History"
        component={OrderHistory}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return getIcon({
              name: 'bell',
              lib: 'MaterialCommunity',
              color: focused ? 'red' : 'black',
              size: 25,
            });
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return getIcon({
              name: 'user',
              lib: 'Awesome',
              color: focused ? 'red' : 'black',
              size: 25,
            });
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
});

export default TabNavigator;
