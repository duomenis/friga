import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';

export default StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  backRightBtnRight: {
    backgroundColor: colors.deleteActionBackground,
    right: 0,
  },
  backTextWhite: {
    color: colors.white,
  },
});
