import React, {useEffect, useState} from 'react';
import {useContext} from '../../core/_root';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import MovieItem from '../../components/MovieItem';

const Home = ({navigation}) => {
  const {state, actions} = useContext();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (currentPage == 0) {
      actions.app.requestPage(0);
      setCurrentPage(1);
    }
  }, [actions.app, currentPage]);

  const requestPage = () => {
    if (!state.app.loading) {
      console.log(`current page: ${currentPage}`);
      actions.app.requestPage(currentPage);
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={state.app.content}
        onEndReachedThreshold={1200}
        onEndReached={() => requestPage()}
        keyExtractor={item => `K${item.id}`}
        renderItem={({item}) => (
          <TouchableOpacity
            key={`TO-${item.id}`}
            onPress={() => console.log(item.name)}>
            <MovieItem
              key={item.id}
              title={item.name}
              image={item.image != null && item.image.medium}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;
