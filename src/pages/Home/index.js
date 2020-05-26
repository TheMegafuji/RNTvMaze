import React, {useEffect, useState} from 'react';
import {useContext} from '../../core/_root';
import {BackHandler, View} from 'react-native';
import {styles} from './styles';
import theme from '../../themes/default';
import {Searchbar} from 'react-native-paper';
import EntityList from '../../components/EntityList';

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
  }, [
    actions.app,
    currentPage,
    searchTerm,
    state.app.clean,
    state.app.loading,
  ]);

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

  const goToDetails = item => {
    actions.app.cleanDetails();
    console.log('Cleared Details');
    navigation.navigate('Details', {item});
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
      <EntityList
        content={state.app.content}
        loading={state.app.loading}
        goToDetails={goToDetails}
        requestPage={requestPage}
      />
    </View>
  );
};

export default Home;
