import {StyleSheet} from 'react-native';
import theme from '../../themes/default';

export const styles = StyleSheet.create({
  header: {
    color: theme.colors.white,
    paddingLeft: 16,
    fontSize: 24,
    fontFamily: theme.fonts.bold,
  },
  episodeTitle: {
    color: theme.colors.white,
    paddingLeft: 8,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
  },
  headerIcon: {
    alignSelf: 'center',
    shadowOpacity: 2,
    textShadowRadius: 10,
    textShadowOffset: {width: 5, height: 2},
    paddingHorizontal: 8,
  },
});
