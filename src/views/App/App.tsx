import React, {useMemo, useState} from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {AuthContext} from '../../AuthContext';
import {
  HomeNonModalStackParamList,
  SettingsStackParamList,
  HomeStackParamList,
  RootTabParamList,
  RootStackParamList,
} from '../../types';

import Home from '../Home';
import Login from '../Login';
import Settings from '../Settings';
import Details from '../Details';
import Edit from '../Edit';

const App = () => {
  const RootStack = createStackNavigator<RootStackParamList>();
  const HomeStack = createStackNavigator<HomeStackParamList>();
  const SettingsStack = createStackNavigator<SettingsStackParamList>();
  const HomeNonModalStack = createStackNavigator<HomeNonModalStackParamList>();
  const RootTab = createBottomTabNavigator<RootTabParamList>();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const authContext = useMemo(
    () => ({
      signIn: () => {
        setIsLoggedIn(true);
      },
      signOut: () => {
        setIsLoggedIn(false);
      },
    }),
    [],
  );

  const RootTabScreens = () => (
    <RootTab.Navigator>
      <RootTab.Screen
        name="HomeStack"
        component={HomeStackScreens}
        options={{title: 'Home'}}
      />
      <RootTab.Screen
        name="SettingsStack"
        component={SettingsStackScreens}
        options={{title: 'Settings'}}
      />
    </RootTab.Navigator>
  );

  const SettingsStackScreens = () => (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={Settings} />
    </SettingsStack.Navigator>
  );

  const HomeStackScreens = () => (
    <HomeStack.Navigator
      mode="modal"
      screenOptions={({
        route,
        navigation,
      }: {
        route: RouteProp<HomeStackParamList, 'HomeNonModalStack' | 'Edit'>;
        navigation: StackNavigationProp<HomeStackParamList>;
      }) => ({
        gestureEnabled: true,
        cardOverlayEnabled: true,
        headerStatusBarHeight:
          navigation
            .dangerouslyGetState()
            .routes.findIndex((r) => r.key === route.key) > 0
            ? 0
            : undefined,
        ...TransitionPresets.ModalPresentationIOS,
      })}>
      <HomeStack.Screen
        name="HomeNonModalStack"
        component={HomeNonModalStackScreens}
        options={{headerShown: false}}
      />
      <HomeStack.Screen name="Edit" component={Edit} />
    </HomeStack.Navigator>
  );

  const HomeNonModalStackScreens = () => (
    <HomeNonModalStack.Navigator>
      <HomeNonModalStack.Screen name="Home" component={Home} />
      <HomeNonModalStack.Screen name="Details" component={Details} />
    </HomeNonModalStack.Navigator>
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStack.Navigator>
          {isLoggedIn ? (
            <RootStack.Screen
              name="RootTab"
              component={RootTabScreens}
              options={{headerShown: false}}
            />
          ) : (
            <RootStack.Screen name="Login" component={Login} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
