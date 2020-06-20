/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,

} from 'react-native';
import {Provider} from 'react-redux';

import Store from './Src/Redux/Store';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import Home from './Src/Components/Home/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Bookmark from './Src/Components/Bookmark/Bookmark';
import Comments from './Src/Components/Home/Comments';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function TabBarItems() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let iconColor;
          if (route.name === 'Home') {
            iconName = 'home';
            iconColor = focused ? 'black' : 'grey';
          } else if (route.name === 'bookmark') {
            iconName = 'bookmark';
            iconColor = focused ? 'black' : 'grey';
          } else if (route.name === 'plus') {
            iconName = 'plus-square-o';
            iconColor = focused ? 'black' : 'grey';
          } else if (route.name === 'heart') {
            iconName = 'heart';
            iconColor = focused ? 'black' : 'grey';
          } else if (route.name === 'user') {
            iconName = 'user';
            iconColor = focused ? 'black' : 'grey';
          }
          return <Icon name={iconName} size={size} color={iconColor} />;
        },
      })}
      tabBarOptions={{
        showLabel: false,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="bookmark" component={Bookmark} />
      <Tab.Screen name="plus" component={Home} />
      <Tab.Screen name="heart" component={Home} />
      <Tab.Screen name="user" component={Home} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="tabbar" component={TabBarItems} />
          <Stack.Screen name="comment" component={Comments}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
