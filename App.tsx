import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthProvider} from './src/context/AuthContext';
import AppNav from './src/navigations/AppNav';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
