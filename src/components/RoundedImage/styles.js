import {StyleSheet} from 'react-native';
import theme from '../../themes/default';

export const styles = StyleSheet.create({
  rounded: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  container: {
    alignItems: 'center',
  },
  font: {
    fontFamily: theme.fonts.regular,
  },
});
