import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';
import {scheme} from '../../types';

export const styles = (theme: scheme = 'light') =>
  StyleSheet.create({
    container: {
      marginTop: 16,
      marginBottom: 16,
    },
    legend: {
      fontSize: 12,
      paddingLeft: 16,
    },
    icon: {
      width: 96,
      height: 96,
      margin: 24,
      borderWidth: 1,
      borderRadius: 12,
      borderColor: colors[theme].accent,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    emoji: {
      fontSize: 64,
      backgroundColor: 'transparent',
    },
  });
