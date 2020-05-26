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
  movieTitle: {
    color: theme.colors.white,
    paddingLeft: 16,
    fontSize: 54,
    fontFamily: theme.fonts.bold,
    shadowOpacity: 20,
    textShadowRadius: 10,
    textShadowOffset: {width: 8, height: 8},
  },
  movieInfo: {
    color: theme.colors.white,
    paddingLeft: 16,
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    shadowOpacity: 10,
    textShadowRadius: 5,
    textShadowOffset: {width: 4, height: 4},
  },
  genre: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: theme.colors.red_primary,
    color: theme.colors.white,
    margin: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 18,
    shadowOpacity: 20,
    textShadowRadius: 10,
    textShadowOffset: {width: 2, height: 2},
    fontFamily: theme.fonts.bold,
  },
  header: {
    color: theme.colors.white,
    paddingTop: 16,
    paddingLeft: 16,
    fontSize: 24,
    fontFamily: theme.fonts.bold,
  },
  summaryText: {
    color: theme.colors.white,
    paddingTop: 16,
    paddingLeft: 16,
    fontSize: 20,
    fontFamily: theme.fonts.regular,
  },
});
