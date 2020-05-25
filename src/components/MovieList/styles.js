import {StyleSheet} from 'react-native';
import themes from '../../themes/default';
import theme from '../../themes/default';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.dark_background,
  },
  title: {
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: theme.fonts.regular,
  },
});
