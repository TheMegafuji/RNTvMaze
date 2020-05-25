import theme from '../../themes/default';
import {FlatList, TouchableOpacity, View, Dimensions, Text} from 'react-native';
import MovieItem from '../MovieItem';
import React from 'react';
import {styles} from './styles';
import {ActivityIndicator} from 'react-native-paper';
const screen = Dimensions.get('window');

const MovieList = ({content, goToDetails, requestPage, loading}) => {
  const onRefresh = () => {
    requestPage();
  };

  const renderFooter = () => {
    const rows = (content.length + (content.length % 2)) / 2;
    const fillArea = screen.height - rows * 200 - 190;
    return content.length == 0 ? (
      <View
        style={{
          marginBottom: screen.height,
          backgroundColor: theme.colors.dark_background,
        }}>
        <Text style={styles.title}>No results</Text>
      </View>
    ) : (
      <View style={{margin: fillArea > 0 ? fillArea : 72}} />
    );
  };

  return loading ? (
    <ActivityIndicator
      style={{marginBottom: screen.height}}
      animating={true}
      color={theme.colors.red_primary}
    />
  ) : (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={content}
      numColumns={2}
      style={{backgroundColor: theme.colors.dark_background}}
      contentInset={{paddingBottom: 80}}
      ListFooterComponent={() => renderFooter()}
      onEndReachedThreshold={0.5}
      onEndReached={() => onRefresh()}
      keyExtractor={item => `K${item.id}`}
      renderItem={({item}) => (
        <TouchableOpacity
          style={{
            flex: 0.5,
            margin: 16,
            borderWidth: 0,
          }}
          key={`TO-${item.id}`}
          onPress={() => goToDetails(item)}>
          <MovieItem
            style={{alignSelf: 'center'}}
            key={item.id}
            title={item.name}
            image={item.image != null && item.image.medium}
          />
        </TouchableOpacity>
      )}
    />
  );
};

export default MovieList;
