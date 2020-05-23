import React, {useEffect, useState} from 'react';
import {useContext} from '../../core/_root';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import MovieItem from '../../components/MovieItem';
import theme from '../../themes/default';
import {ActivityIndicator, Searchbar} from 'react-native-paper';

const Home = ({navigation}) => {
  const {state, actions} = useContext();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (currentPage == 0 && searchTerm == '') {
      actions.app.requestPage(0);
      console.log(`Loading page: ${currentPage}`);
      setCurrentPage(1);
    }
  }, [actions.app, currentPage, searchTerm]);

  const requestPage = () => {
    if (!state.app.loading && searchTerm == '') {
      console.log(`Loading page: ${currentPage}`);
      actions.app.requestPage(currentPage);
      setCurrentPage(currentPage + 1);
    }
  };

  const requestSearch = term => {
    if (!state.app.loading) {
      console.log(`Search term: ${term}`);
      if (term == '') {
        setCurrentPage(0);
        requestPage();
      } else {
        actions.app.requestSearch(term);
      }
    }
  };

  const changeSearchTerm = term => {
    setSearchTerm(term);
    if (timer != null) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(() => requestSearch(term), 1000));
  };

  const onRefresh = () => {
    requestPage();
  };

  const renderFooter = () => {
    return state.app.content.length == 0 ? (
      <ActivityIndicator
        style={{marginBottom: 32}}
        animating={true}
        color={theme.colors.red_primary}
      />
    ) : (
      <View style={{margin: 72}} />
    );
  };

  return (
    <View style={styles.container}>
      <Searchbar
        style={{
          margin: 16,
          backgroundColor: theme.colors.dark_primary,
        }}
        theme={{colors: {text: theme.colors.dark_secondary}}}
        placeholderTextColor={theme.colors.dark_secondary}
        iconColor={theme.colors.dark_secondary}
        placeholder="Search"
        onChangeText={changeSearchTerm}
        value={searchTerm}
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={state.app.content}
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
            }}
            key={`TO-${item.id}`}
            onPress={() => console.log(item.name)}>
            <MovieItem
              style={{alignSelf: 'center'}}
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
