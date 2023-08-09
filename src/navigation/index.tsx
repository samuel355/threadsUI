import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Account from '../screens/Account';
import { TabView } from 'react-native-tab-view';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const TopTabs = createMaterialTopTabNavigator();

const HomeTabs = () => {
    return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    );
}

const RootNavigator = () => {
    return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>
      </NavigationContainer>
    );
}

export default RootNavigator;