import {FlatList, Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {styles} from './styles';
import React from 'react';

const CastList = ({show}) => {
  return (
    <FlatList
      style={{marginLeft: 16}}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={show._embedded.cast}
      renderItem={({item}) => {
        return (
          <View style={styles.avatarView}>
            {item.person.image ? (
              <Avatar.Image
                size={96}
                source={{uri: item.person.image.medium}}
              />
            ) : (
              <Avatar.Text size={96} label={'?'} />
            )}
            <Text style={styles.castName}>{item.person.name}</Text>
          </View>
        );
      }}
      keyExtractor={item => `cast${item.person.id}`}
    />
  );
};

export default CastList;
