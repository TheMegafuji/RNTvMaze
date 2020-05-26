import React from 'react';

import {Card, List} from 'react-native-paper';
import {Image, View, Text} from 'react-native';
import {styles} from './styles';
import RoundedImage from '../RoundedImage';
import theme from '../../themes/default';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EntityItem = ({item, image, people = false}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: theme.colors.dark_primary,
          borderRadius: 16,
        }}>
        <RoundedImage style={{alignItems: 'center'}} image={image} />
        <View
          style={{
            marginTop: 4,
            paddingLeft: 6,
            flex: 1,
            alignItems: 'flex-start',
          }}>
          <Text style={styles.title} numberOfLines={3}>
            {item.name}
          </Text>
          {people ? (
            <View>
              {'country' in item && item.country != null && (
                <Text style={styles.description}>{item.country.name}</Text>
              )}
              {item.birthday != null && (
                <Text style={styles.description}>{item.birthday}</Text>
              )}
            </View>
          ) : (
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {item.premiered && (
                  <Text style={styles.description}>{`${
                    item.premiered.split('-')[0]
                  }`}</Text>
                )}
                {item.rating.average && (
                  <Text style={styles.description}>{` - ${
                    item.rating.average
                  }`}</Text>
                )}
                <Icon name={'star'} size={16} color={theme.colors.white} />
              </View>
              <Text style={styles.description}>{item.status}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default EntityItem;
