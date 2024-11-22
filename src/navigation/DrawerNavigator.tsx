import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import MovieListScreen from '../screens/MovieListScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f3f4f6',
        },
        headerTintColor: '#1f2937',
        drawerActiveTintColor: '#4b5563',
        drawerInactiveTintColor: '#9ca3af',
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="MovieList"
        component={MovieListScreen}
        options={{
          drawerLabel: 'Movies',
          title: 'Movie List',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
