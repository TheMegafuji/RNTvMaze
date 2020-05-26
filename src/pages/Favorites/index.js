import React, {useEffect, useState} from 'react';
import {useContext} from '../../core/_root';
import {View} from 'react-native';
import {styles} from './styles';
import MovieList from '../../components/MovieList';
import {useIsFocused} from '@react-navigation/native';

const Favorites = ({navigation}) => {
  const {state, actions} = useContext();
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [loadOnFocus, setLoadOnFocus] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (!loadOnFocus) {
        setLoadOnFocus(true);
        actions.app.getFavorites();
        console.log('Loading favorites');
        setFavoritesLoaded(true);
      }
    } else {
      setLoadOnFocus(false);
    }
  }, [actions.app, isFocused, loadOnFocus]);

  useEffect(() => {
    if (!favoritesLoaded) {
      actions.app.getFavorites();
      console.log('Loading favorites');
      setFavoritesLoaded(true);
    }
  }, [actions.app, favoritesLoaded, navigation]);

  const requestPage = () => {};

  const goToDetails = item => {
    actions.app.cleanDetails();
    console.log('Cleared Details');
    navigation.navigate('Details', {item});
  };

  return (
    <View style={styles.container}>
      <MovieList
        content={state.app.favorites}
        loading={state.app.favoritesLoading}
        goToDetails={goToDetails}
        requestPage={requestPage}
      />
    </View>
  );
};

export default Favorites;
