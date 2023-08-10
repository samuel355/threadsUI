
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import Account from '../screens/Account';
import Search from '../screens/Search';
import Create from '../screens/Create';
import Like from '../screens/Like';
import { Image } from 'react-native';

//icons
const homeBoldIcon = '../assets/icons/home-bold.png';
const homeLightIcon = '../assets/icons/home-light.png';
const searchBoldIcon = '../assets/icons/search-bold.png';
const searchLightIcon = '../assets/icons/search-bold.png';
const createIcon = '../assets/icons/create.png';
const likeIcon = '../assets/icons/like.png';
const likedIcon = '../assets/icons/liked.png';
const userBoldIcon = '../assets/icons/user-bold.png';
const userLightIcon = '../assets/icons/user-light.png';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? require(homeBoldIcon) : require(homeLightIcon)}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000' : '#444',
              }}
            />
          ),
        })}
        name="Home"
        component={Home}
      />

      <Tab.Screen
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused ? require(searchBoldIcon) : require(searchLightIcon)
              }
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000' : '#444',
              }}
            />
          ),
        })}
        name="Search"
        component={Search}
      />

      <Tab.Screen
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? require(createIcon) : require(createIcon)}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000' : '#444',
              }}
            />
          ),
        })}
        name="Create"
        component={Create}
      />

      <Tab.Screen
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? require(likedIcon) : require(likeIcon)}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000' : '#444',
              }}
            />
          ),
        })}
        name="Like"
        component={Like}
      />

      <Tab.Screen
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? require(userBoldIcon) : require(userLightIcon)}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#000' : '#444',
              }}
            />
          ),
        })}
        name="Account"
        component={Account}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="home-tabs" component={HomeTabs} />
        <Stack.Screen name="create" component={Create} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
