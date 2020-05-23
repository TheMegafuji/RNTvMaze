import React from 'react';

import {Card, List} from 'react-native-paper';
import {Image, View} from 'react-native';
import {styles} from './styles';
import RoundedImage from '../RoundedImage';
import theme from '../../themes/default';

const MovieItem = ({title, image}) => {
  return (
    <View>
      <Card style={{backgroundColor: theme.colors.dark_background}}>
        <List.Item
          title={title}
          titleStyle={styles.title}
          left={() => RoundedImage({image})}
        />
      </Card>
    </View>
  );
};

export default MovieItem;
