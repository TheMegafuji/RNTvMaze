import {StyleSheet} from 'react-native';
import themes from '../../themes/default';
import theme from '../../themes/default';

export const styles = StyleSheet.create({
  movieTitle: {
    color: theme.colors.white,
    paddingLeft: 16,
    fontSize: 54,
    fontFamily: theme.fonts.bold,
    shadowOpacity: 20,
    textShadowRadius: 10,
    textShadowOffset: {width: 8, height: 8},
  },
  header: {
    color: theme.colors.white,
    paddingTop: 16,
    paddingLeft: 16,
    fontSize: 24,
    fontFamily: theme.fonts.bold,
  },
  headerIcon: {
    shadowOpacity: 2,
    textShadowRadius: 10,
    textShadowOffset: {width: 5, height: 2},
    paddingHorizontal: 8,
  },
  dialogText: {
    color: theme.colors.white,
    paddingTop: 8,
    paddingLeft: 16,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
  },
  dialogButton: {
    backgroundColor: theme.colors.red_primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 4,
    margin: 8,
  },
  substituteimage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
