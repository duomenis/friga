import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: colors.primaryLight,
    paddingLeft: 12,
    paddingRight: 20,
    paddingVertical: 6,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },
  button: {
    color: colors.white,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    padding: 16,
    opacity: 0.7,
    color: colors.textLight,
  },
});
