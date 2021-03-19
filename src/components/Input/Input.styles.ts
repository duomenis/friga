import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';
import {scheme} from '../../types';

export const styles = (theme: scheme = 'light') =>
  StyleSheet.create({
    input: {
      marginLeft: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: colors[theme].primaryText,
    },
    border: {
      borderBottomWidth: 0.5,
      borderBottomColor: colors.inputBottomBorder,
    },
  });
