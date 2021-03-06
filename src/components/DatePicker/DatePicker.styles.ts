import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {},
  control: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.inputBottomBorder,
    marginLeft: 16,
    marginBottom: 12,
    paddingVertical: 12,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
  value: {
    color: colors.accent,
  },
});
