import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Drawer from './src/components/Drawer';
import { ProductListProvider } from './src/components/Context';
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/views/Login'

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <ProductListProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' screenOptions={screenOptions}>
              <Stack.Screen name='Login'
              options={{ title: '' }}>
                {
                  props => (
                    <Login {...props}></Login>
                  )
                }
              </Stack.Screen>
              <Stack.Screen name='Drawer'>
                {
                  props => (
                    <Drawer></Drawer>
                  )
                }
              </Stack.Screen>
            </Stack.Navigator>
            {/* <Drawer></Drawer> */}
          </NavigationContainer>
        </ProductListProvider>
      </ApplicationProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const screenOptions = {
  headerStyle: {
      backgroundColor: '#f4511e'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
      fontWeight: 'bold',
  },
  headerShown: false
}
