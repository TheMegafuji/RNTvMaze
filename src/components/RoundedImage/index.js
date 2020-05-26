import {Avatar} from 'react-native-paper';
import {styles} from './styles';
import {View, Text, Image} from 'react-native';
import React from 'react';
import imageCacheHoc from 'react-native-image-cache-hoc';
import theme from '../../themes/default';

const CacheableImage = imageCacheHoc(Image, {
  validProtocols: ['http', 'https'],
});

const RoundedImage = ({...props}) => {
  const {image, size = 120} = props;

  let picture = (
    <View
      style={[
        styles.rounded,
        {
          width: 85,
          height: 120,
          backgroundColor: theme.colors.white,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <Text>No Image</Text>
    </View>
  );
  if (image) {
    picture = (
      <CacheableImage
        style={[styles.rounded, {width: 85, height: 120}]}
        source={{uri: image}}
        permanent={false}
      />
    );
  }
  return (
    <View style={[styles.container, {...props}]}>
      <View>{picture}</View>
    </View>
  );
};

export default RoundedImage;
