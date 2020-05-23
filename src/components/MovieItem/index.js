import React from 'react';

import {Card, List} from 'react-native-paper';
import {Image, View, Text} from 'react-native';
import {styles} from './styles';
import RoundedImage from '../RoundedImage';
import theme from '../../themes/default';

const MovieItem = ({title, image}) => {
  return (
    <View>
      <Card style={{backgroundColor: theme.colors.dark_background}}>
        <RoundedImage style={{alignItems: 'center'}} image={image} />
        <Text style={styles.title}>{title}</Text>
      </Card>
    </View>
  );
};

export default MovieItem;
