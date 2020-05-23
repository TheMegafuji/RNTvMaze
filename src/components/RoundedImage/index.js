import {Avatar} from 'react-native-paper';
import {styles} from './styles';
import {View, Text} from 'react-native';
import React from 'react';
import Image from 'react-native-scalable-image';

const RoundedImage = ({...props}) => {
  const {image, size = 120} = props;

  let picture = <Text>?</Text>;
  if (image) {
    picture = <Image height={size} source={{uri: image}} />;
  }
  return (
    <View style={[styles.container, {...props}]}>
      <View style={styles.rounded}>{picture}</View>
    </View>
  );
};

export default RoundedImage;
