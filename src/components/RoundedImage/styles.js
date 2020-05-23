import {StyleSheet} from 'react-native';
import theme from '../../themes/default';

export const styles = StyleSheet.create({
  rounded: {
    padding: 2,
    borderRadius: 16,
  },
  container: {
    padding: 8,
    alignItems: 'center',
  },
  font: {
    fontFamily: theme.fonts.regular,
  },
});
