import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import colors from '../../constants/colors';
import DataProvider from '../../DataContext';
import {LightTheme, DarkTheme} from '../../Themes';
import {
  RootTabParamList,
  RootStackParamList,
  SinceListStackParamList,
  UntilListStackParamList,
} from '../../types';

import List from '../List';
import CreateCounter from '../CreateCounter';
import EditCounter from '../EditCounter';
import EmojiPicker from '../EmojiPicker';

const App = () => {
  const scheme = useColorScheme() || 'light';
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
          title: 'COUNTLY',
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
          title: 'COUNTLY',
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
        style: {
          backgroundColor: colors[scheme].tabNavigatorBackground,
          borderTopColor: colors[scheme].tabNavigatorBorder,
        },
      }}>
      <RootTab.Screen
        name="UntilListStack"
        component={UntilListStackScreens}
        options={{
          title: 'Days Until',
          tabBarIcon: ({color, size}) => (
            <Icon name="fast-forward" color={color} size={size} />
          ),
        }}
      />
      <RootTab.Screen
        name="SinceListStack"
        component={SinceListStackScreens}
        options={{
          title: 'Days Since',
          tabBarIcon: ({color, size}) => (
            <Icon name="rewind" color={color} size={size} />
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
              'RootTab' | 'CreateCounter' | 'EmojiPicker' | 'EditCounter'
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
              title: 'COUNTLY',
            }}
          />
          <RootStack.Screen
            name="CreateCounter"
            component={CreateCounter}
            options={{title: 'New Counter'}}
          />
          <RootStack.Screen
            name="EditCounter"
            component={EditCounter}
            options={{
              title: 'Edit Counter',
              headerStyle: {
                backgroundColor: colors[scheme].modalHeaderBackground,
              },
            }}
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
