import {StyleSheet} from 'react-native';
import themes from '../../themes/default';
import theme from '../../themes/default';

export const styles = StyleSheet.create({
  avatarView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  castName: {
    flex: 1,
    flexWrap: 'wrap',
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
  },
});
