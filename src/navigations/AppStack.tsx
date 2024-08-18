import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import TabNavigator from './TabNavigator';
import MapboxScreen from '../screens/MapboxScreen';
import {Provider} from 'react-redux';
import {store} from '../store/redux/store';
import CartScreen from '../screens/CartScreen';
import ChatScreen from '../screens/ChatScreen';
import { CartContextProvider } from '../store/context/CartContext';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <CartContextProvider>
      <Provider store={store}>
        <Stack.Navigator
          screenOptions={
            {
              // headerShown: false,
            }
          }>
          <Stack.Screen
            name="TabsNavigator"
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              animation: 'fade_from_bottom',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Payments"
            component={PaymentScreen}
            options={{
              animation: 'fade_from_bottom',
              headerShown: true,
              title: 'Chi tiết đơn hàng',
            }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{
              animation: 'fade_from_bottom',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Mapbox"
            component={MapboxScreen}
            options={{
              animation: 'fade_from_bottom',
              headerShown: true,
              title: 'Bản đồ',
            }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              animation: 'fade_from_bottom',
              headerShown: true,
              title: 'Chat',
            }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              animation: 'fade_from_bottom',
              headerShown: true,
              title: '',
            }}
          />
        </Stack.Navigator>
      </Provider>
    </CartContextProvider>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
