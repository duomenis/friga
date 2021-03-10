import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  RootTabParamList,
  RootStackParamList,
  SinceListStackParamList,
  UntilListStackParamList,
} from '../../types';

import DataProvider from '../../DataContext';
import {LightTheme, DarkTheme} from '../../Themes';

import List from '../List';
import CreateCounter from '../CreateCounter';
import EmojiPicker from '../EmojiPicker';

const App = () => {
  const scheme = useColorScheme();
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
          title: 'Countly',
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
          title: 'Countly',
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
        options={{
          title: 'Days Until',
          tabBarIcon: ({color, size}) => (
            <Icon name="arrow-right" color={color} size={size} />
          ),
        }}
      />
      <RootTab.Screen
        name="SinceListStack"
        component={SinceListStackScreens}
        options={{
          title: 'Days Since',
          tabBarIcon: ({color, size}) => (
            <Icon name="arrow-left" color={color} size={size} />
          ),
        }}
      />
    </RootTab.Navigator>
  );

  return (
    <DataProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
        <RootStack.Navigator
          mode="modal"
          screenOptions={({
            route,
            navigation,
          }: {
            route: RouteProp<
              RootStackParamList,
              'RootTab' | 'CreateCounter' | 'EmojiPicker'
            >;
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
              title: 'Countly',
            }}
          />
          <RootStack.Screen
            name="CreateCounter"
            component={CreateCounter}
            options={{title: 'New Counter'}}
          />
          <RootStack.Screen
            name="EmojiPicker"
            component={EmojiPicker}
            options={{title: 'Choose Icon'}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
};

export default App;
