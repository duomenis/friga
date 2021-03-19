import {StyleSheet} from 'react-native';

import colors from '../../constants/colors';

export default StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    backgroundColor: colors['light'].cardBackground,
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 24,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  backRightBtnRight: {
    backgroundColor: colors.deleteActionBackground,
    right: 0,
  },
  backTextWhite: {
    color: colors['light'].viewBackground,
  },
});
