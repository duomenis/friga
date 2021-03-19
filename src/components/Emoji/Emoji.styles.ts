import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';
import {scheme} from '../../types';

export const styles = (theme: scheme = 'light') =>
  StyleSheet.create({
    container: {
      backgroundColor: colors[theme].viewBackground,
      borderRadius: 8,
      marginRight: 8,
      padding: 8,
    },
    icon: {
      fontSize: 20,
      textAlign: 'center',
    },
  });
