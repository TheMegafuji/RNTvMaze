import {Dimensions, StyleSheet} from 'react-native';
import theme from '../../themes/default';

export const styles = StyleSheet.create({
  title: {
    color: theme.colors.white,
    fontSize: 18,
    flexWrap: 'wrap',
    fontFamily: theme.fonts.bold,
  },
  description: {
    color: theme.colors.white,
    fontSize: 16,
    flexWrap: 'wrap',
    fontFamily: theme.fonts.regular,
  },
});
