import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import DetailsScreen from '../screens/DetailsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import MapboxScreen from '../screens/MapboxScreen';
import {AuthContext, AuthContextProps} from '../context/AuthContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();

const AppNav = () => {
  const {token, isAuthenticated} = useContext<Partial<AuthContextProps>>(AuthContext);
  
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNav;

const styles = StyleSheet.create({});
