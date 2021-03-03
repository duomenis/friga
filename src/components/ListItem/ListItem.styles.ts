import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  left: {
    flex: 1,
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    marginBottom: 4,
  },
  days: {
    fontSize: 24,
  },
});
