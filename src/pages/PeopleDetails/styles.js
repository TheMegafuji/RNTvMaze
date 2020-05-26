import {StyleSheet} from 'react-native';
import themes from '../../themes/default';
import theme from '../../themes/default';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.dark_background,
  },
  headerIcon: {
    shadowOpacity: 2,
    textShadowRadius: 10,
    textShadowOffset: {width: 5, height: 2},
    paddingHorizontal: 8,
  },
  personTitle: {
    color: theme.colors.white,
    paddingLeft: 16,
    fontSize: 54,
    fontFamily: theme.fonts.bold,
  },
  personInfo: {
    color: theme.colors.white,
    paddingLeft: 16,
    fontSize: 18,
    fontFamily: theme.fonts.regular,
  },
  headerDetail: {
    color: theme.colors.white,
    paddingLeft: 16,
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: theme.fonts.bold,
  },
  itemDetail: {
    color: theme.colors.white,
    flexWrap: 'wrap',
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: theme.fonts.regular,
  },
});
