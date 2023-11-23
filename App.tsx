import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth'; 
import {preventAutoHideAsync} from 'expo-splash-screen';
import AppNavigator from './AppNavigator';
import { Splash } from './app/screens/Splash';

export default function App() {
  const [splashComplete, setSplashComplete] =  useState(false);

  return (
    <NavigationContainer>
      <AuthProvider>
      {  splashComplete ?  <AppNavigator /> :
     <Splash onComplete={setSplashComplete} /> 
     }
     
      </AuthProvider>
    </NavigationContainer>
  );
}
