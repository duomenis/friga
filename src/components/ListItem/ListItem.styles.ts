import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  left: {
    flex: 1,
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 16,
  },
  name: {
    fontSize: 20,
    marginBottom: 4,
  },
  format: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.5,
  },
});
