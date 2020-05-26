import theme from '../../themes/default';
import {FlatList, TouchableOpacity, View, Dimensions, Text} from 'react-native';
import EntityItem from '../EntityItem';
import React from 'react';
import {styles} from './styles';
import {ActivityIndicator} from 'react-native-paper';
const screen = Dimensions.get('window');

const EntityList = ({
  content,
  goToDetails,
  requestPage,
  loading,
  people = false,
}) => {
  const onRefresh = () => {
    requestPage();
  };

  const renderFooter = () => {
    const rows = (content.length + (content.length % 2)) / 2;
    const fillArea = screen.height - rows * 140 - 180;
    return content.length == 0 ? (
      <View
        style={{
          marginBottom: screen.height,
          backgroundColor: theme.colors.dark_background,
        }}>
        <Text style={styles.title}>No results</Text>
      </View>
    ) : (
      <View style={{margin: fillArea > 0 ? fillArea : 96}} />
    );
  };

  return loading ? (
    <ActivityIndicator
      style={{marginTop: 10, marginBottom: screen.height}}
      animating={true}
      color={theme.colors.red_primary}
    />
  ) : (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={content}
      numColumns={people ? 1 : 2}
      style={{backgroundColor: theme.colors.dark_background}}
      contentInset={{paddingBottom: 80}}
      ListFooterComponent={() => renderFooter()}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        !people && onRefresh();
      }}
      keyExtractor={item => `K${(people ? 'P' : '') + item.id}`}
      renderItem={({item}) => (
        <TouchableOpacity
          style={{
            flex: 0.5,
            margin: 16,
            borderWidth: 0,
          }}
          key={`TO-${(people ? 'P' : '') + item.id}`}
          onPress={() => goToDetails(item)}>
          <EntityItem
            style={{alignSelf: 'center'}}
            key={item.id}
            item={item}
            image={item.image != null && item.image.medium}
            people={people}
          />
        </TouchableOpacity>
      )}
    />
  );
};

export default EntityList;
