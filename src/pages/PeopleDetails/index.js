import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useContext} from '../../core/_root';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ActivityIndicator, List} from 'react-native-paper';
import {styles} from './styles';
import theme from '../../themes/default';

const PeopleDetails = ({navigation, route}) => {
  const {item} = route.params;
  const {state, actions} = useContext();
  const [loadInformation, setLoadInformation] = useState(false);

  useEffect(() => {
    const loadPerson = async () => {
      if (!loadInformation) {
        actions.people.requestPersonInfo(item.id);
        setLoadInformation(true);
      }
    };
    loadPerson();
  }, [actions.people, item.id, loadInformation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name={'arrow-back'}
            style={styles.headerIcon}
            size={30}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => goToDetails(item.show)}
        style={{flex: 1, marginHorizontal: 12, marginTop: 12}}>
        {item.show.image && item.show.image.medium != null ? (
          <Image
            style={{
              width: 100,
              height: 160,
              borderRadius: 12,
            }}
            source={{uri: item.show.image.medium}}
          />
        ) : (
          <View
            style={{
              width: 100,
              height: 160,
              borderRadius: 12,
              backgroundColor: theme.colors.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={[
                styles.personInfo,
                {paddingLeft: 0, color: theme.colors.dark_primary},
              ]}>
              No Image
            </Text>
          </View>
        )}
        <Text style={styles.itemDetail} numberOfLines={2}>
          {item.show.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const goToDetails = item => {
    actions.app.cleanDetails();
    navigation.navigate('Details', {item});
  };

  return (
    <View style={styles.container}>
      {item.image && item.image.original != null ? (
        <Image
          style={{
            zIndex: -1,
            position: 'absolute',
            width: '100%',
            height: '50%',
          }}
          source={{uri: item.image.original}}
        />
      ) : (
        <View
          style={{
            zIndex: -1,
            position: 'absolute',
            width: '100%',
            height: '50%',
            backgroundColor: theme.colors.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              styles.personTitle,
              {textColor: theme.colors.dark_primary},
            ]}>
            No Image
          </Text>
        </View>
      )}
      <ScrollView
        style={{
          backgroundColor: theme.colors.dark_background,
          marginTop: 300,
          borderRadius: 16,
        }}>
        <Text style={styles.personTitle}>{item.name}</Text>
        <List.Item
          left={() => (
            <Text style={styles.personInfo}>{`Birth Date: ${
              item.birthday
            }`}</Text>
          )}
          right={() => {
            return (
              'country' in item &&
              item.country != null && (
                <Text style={styles.personInfo}>{`Country: ${
                  item.country.name
                }`}</Text>
              )
            );
          }}
        />
        <List.Item
          left={() => (
            <Text style={styles.personInfo}>{`Gender: ${item.gender}`}</Text>
          )}
          right={() => (
            <Text style={styles.personInfo}>{`Death date: ${
              item.deathday != null ? item.deathday : 'Alive'
            }`}</Text>
          )}
        />
        <Text style={styles.headerDetail}>{'Known For'}</Text>
        {state.people.loading ? (
          <ActivityIndicator
            animating={true}
            style={{margin: 16}}
            color={theme.colors.red_primary}
          />
        ) : (
          <FlatList
            style={{marginLeft: 16, paddingBottom: 240}}
            horizontal={true}
            ListFooterComponent={() => (
              <View
                style={{
                  backgroundColor: theme.colors.dark_background,
                  paddingBottom: 240,
                }}
              />
            )}
            data={state.people.detailedPerson}
            renderItem={({item}) => renderItem(item._embedded)}
            keyExtractor={index => `No${index}`}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default PeopleDetails;
