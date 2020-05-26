import React, {useEffect, useState} from 'react';
import {useContext} from '../../core/_root';
import {BackHandler, View} from 'react-native';
import {styles} from './styles';
import theme from '../../themes/default';
import {Searchbar} from 'react-native-paper';
import EntityList from '../../components/EntityList';

const People = ({navigation}) => {
  const {state, actions} = useContext();
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (!loaded && searchTerm == '') {
      actions.people.requestPeople(false);
      setLoaded(true);
    }
  }, [actions.people, loaded, searchTerm]);

  const requestContent = (term) => {
    if (!state.people.loading && term == '') {
      actions.people.requestPeople(true);
    }
  };

  const requestSearch = term => {
    if (!state.people.loading) {
      console.log(`Search term: ${term}`);
      if (term == '') {
        requestContent(term);
      } else {
        actions.people.peopleSearch(term);
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
    navigation.navigate('PeopleDetails', {item});
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
        content={state.people.content}
        loading={state.people.loading}
        goToDetails={goToDetails}
        people={true}
      />
    </View>
  );
};

export default People;
