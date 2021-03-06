import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';

export default StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    backgroundColor: colors.listActionsBackground,
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: colors.deleteActionBackground,
    right: 0,
  },
  backTextWhite: {
    color: colors.white,
  },
});
