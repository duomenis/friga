import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';
import {scheme} from '../../types';

export const styles = (theme: scheme = 'light') =>
  StyleSheet.create({
    container: {
      backgroundColor: colors[theme].cardBackground,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 16,
      marginHorizontal: 16,
      marginVertical: 6,
      borderRadius: 8,
    },
    left: {
      flex: 1,
    },
    name: {
      fontSize: 20,
      fontWeight: '500',
      marginBottom: 4,
      color: colors[theme].primaryText,
    },
    format: {
      fontSize: 14,
      color: colors[theme].secondaryText,
    },
    icon: {
      backgroundColor: colors[theme].viewBackground,
    },
  });
