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
    iconContainer: {
      display: 'flex',
      flexDirection: 'row',
      paddingVertical: 12,
      paddingRight: 16,
      justifyContent: 'space-between',
    },
    iconPickerText: {
      fontSize: 16,
      color: colors[theme].primaryText,
    },
    emoji: {
      fontSize: 18,
      backgroundColor: 'transparent',
    },
    formSection: {
      backgroundColor: colors[theme].formSectionBackground,
      paddingLeft: 16,
      margin: 16,
      borderRadius: 12,
    },
    deleteButtonSection: {
      paddingVertical: 4,
    },
  });
