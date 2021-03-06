import {DefaultTheme} from '@react-navigation/native';
import colors from './constants/colors';

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.primary,
    text: colors.white,
    card: colors.primary,
  },
};
