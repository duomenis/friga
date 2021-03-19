import {DefaultTheme} from '@react-navigation/native';
import colors from './constants/colors';

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.light.accent, // tabs text
    background: colors.light.viewBackground, // view bg
    text: colors.light.primaryText, // headerText
    card: colors.light.viewBackground, // header
    border: colors.light.viewBackground,
  },
};

export const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.dark.accent, // tabs text
    background: colors.dark.viewBackground, // view bg
    text: colors.dark.primaryText, // headerText
    card: colors.dark.viewBackground, // header
    border: colors.dark.viewBackground,
  },
};
