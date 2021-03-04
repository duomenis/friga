import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';

export default StyleSheet.create({
  input: {
    marginLeft: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.inputBottomBorder,
  },
});
