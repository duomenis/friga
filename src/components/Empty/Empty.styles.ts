import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';
import {scheme} from '../../types';

export const styles = (theme: scheme = 'light') =>
  StyleSheet.create({
    container: {
      backgroundColor: colors[theme].viewBackground,
      flex: 1,
      padding: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 250,
      height: 250,
      marginBottom: 10,
      resizeMode: 'cover',
    },
    text: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      color: colors[theme].primaryText,
    },
    info: {color: colors[theme].secondaryText},
  });
