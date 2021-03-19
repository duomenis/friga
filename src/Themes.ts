import {DefaultTheme} from '@react-navigation/native';
import colors from './constants/colors';

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.accent, // tabs text
    background: colors.viewBackground, // view bg
    text: colors.primaryText, // headerText
    card: colors.viewBackground, // header
    border: colors.viewBackground,
  },
};

export const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};
