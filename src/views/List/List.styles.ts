import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';
import {scheme} from '../../types';

export const styles = (theme: scheme = 'light') =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    buttonContainer: {
      paddingLeft: 12,
      paddingRight: 20,
      paddingVertical: 6,
    },
    button: {
      color: colors[theme].accent,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      padding: 16,
      color: colors[theme].primaryText,
    },
  });
