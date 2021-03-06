import React from 'react';
import {
  NavigationContainer,
  RouteProp,
  //DefaultTheme,
  //DarkTheme,
} from '@react-navigation/native';
//import {useColorScheme} from 'react-native';
import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  RootTabParamList,
  RootStackParamList,
  SinceListStackParamList,
  UntilListStackParamList,
} from '../../types';

import List from '../List';
import CreateCounter from '../CreateCounter';
import DataProvider from '../../DataContext';
import {LightTheme} from '../../Themes';

const App = () => {
  //const scheme = useColorScheme();
  const RootStack = createStackNavigator<RootStackParamList>();
  const SinceListStack = createStackNavigator<SinceListStackParamList>();
  const UntilListStack = createStackNavigator<UntilListStackParamList>();
  const RootTab = createBottomTabNavigator<RootTabParamList>();

  const UntilListStackScreens = () => (
    <UntilListStack.Navigator>
      <UntilListStack.Screen
        name="UntilList"
        component={List}
        options={{
          title: 'County',
        }}
      />
    </UntilListStack.Navigator>
  );

  const SinceListStackScreens = () => (
    <SinceListStack.Navigator>
      <SinceListStack.Screen
        name="SinceList"
        component={List}
        initialParams={{since: true}}
        options={{
          title: 'County',
        }}
      />
    </SinceListStack.Navigator>
  );

  const RootTabScreens = () => (
    <RootTab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 12,
        },
        style: {backgroundColor: 'white'},
      }}>
      <RootTab.Screen
        name="UntilListStack"
        component={UntilListStackScreens}
        options={{title: 'Days Until'}}
      />
      <RootTab.Screen
        name="SinceListStack"
        component={SinceListStackScreens}
        options={{title: 'Days Since'}}
      />
    </RootTab.Navigator>
  );

  return (
    <DataProvider>
      <NavigationContainer theme={LightTheme}>
        <RootStack.Navigator
          mode="modal"
          screenOptions={({
            route,
            navigation,
          }: {
            route: RouteProp<RootStackParamList, 'RootTab' | 'CreateCounter'>;
            navigation: StackNavigationProp<RootStackParamList>;
          }) => ({
            gestureEnabled: true,
            cardOverlayEnabled: true,
            headerStatusBarHeight:
              navigation
                .dangerouslyGetState()
                .routes.findIndex((r) => r.key === route.key) > 0
                ? 10
                : undefined,
            ...TransitionPresets.ModalPresentationIOS,
          })}>
          <RootStack.Screen
            name="RootTab"
            component={RootTabScreens}
            options={{
              headerShown: false,
              title: 'County',
            }}
          />
          <RootStack.Screen
            name="CreateCounter"
            component={CreateCounter}
            options={{title: 'New Counter'}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
};

export default App;
