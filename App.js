import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator'
import AppLoading from 'expo-app-loading';
import { useFonts, Allan_400Regular, Allan_700Bold } from '@expo-google-fonts/allan';


export default function App() {

  let [fontsLoaded] = useFonts({ Allan_400Regular, Allan_700Bold });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <StatusBar style="black" />
        <StackNavigator />
      </NavigationContainer>
    );
  }
}
