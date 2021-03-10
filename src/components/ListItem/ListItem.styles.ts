import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.primaryLight,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
  },
  left: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    marginBottom: 4,
    color: colors.textLight,
  },
  format: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.6,
    color: colors.textLight,
  },
});
