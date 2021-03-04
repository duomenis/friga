import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomColor: colors.inputBottomBorder,
    borderTopColor: colors.inputBottomBorder,
    marginTop: 16,
    marginBottom: 16,
  },
  legend: {
    fontSize: 12,
    paddingLeft: 16,
  },
});
