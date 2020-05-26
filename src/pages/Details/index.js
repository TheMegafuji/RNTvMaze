import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useContext} from '../../core/_root';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import theme from '../../themes/default';
import imageCacheHoc from 'react-native-image-cache-hoc';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused} from '@react-navigation/native';
import DetailDialog from '../../components/DetailDialog';
import DetailsBody from '../../components/DetailsBody';

const CacheableImage = imageCacheHoc(Image, {
  validProtocols: ['http', 'https'],
});

const Details = ({navigation, route}) => {
  const {item} = route.params;
  const {state, actions} = useContext();
  const [collapse, setCollapse] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadOnFocus, setLoadOnFocus] = useState(false);
  const [doNotCheck, setDoNotCheck] = useState(false);
  const [keepOffline, setKeepOffline] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    const checkIsFavorite = async () => {
      if (!doNotCheck) {
        const exists = await actions.app.isFavorite(item.id);
        console.log(`setIsFavorite ${exists}`);
        await setIsFavorite(exists);
        setHeader(exists);
      }
    };
    if (isFocused) {
      if (!loadOnFocus) {
        setLoadOnFocus(true);
        checkIsFavorite();
      }
    } else {
      setLoadOnFocus(false);
    }
  }, [actions.app, doNotCheck, isFocused, item.id, loadOnFocus, setHeader]);

  useEffect(() => {
    if (!'offline' in item) {
      item.offline = false;
    }
  }, [item]);

  useEffect(() => {
    if (!state.app.loading && state.app.show == null) {
      actions.app.requestShow(item.id);
    }
    if (!state.app.episodesLoading && state.app.episodes == null) {
      actions.app.requestEpisodes(item.id);
    }
  }, [
    actions.app,
    item.id,
    state.app.episodes,
    state.app.episodesLoading,
    state.app.loading,
    state.app.show,
  ]);

  const setHeader = (exists = isFavorite) => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => callToggleFavorite(exists)}>
          <Icon
            name={exists ? 'favorite' : 'favorite-border'}
            style={styles.headerIcon}
            size={30}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      ),
    });
  };

  const goToCast = item => {
    actions.people.clearDetails();
    navigation.navigate('PeopleDetails', {item});
  };

  const toggleFavorite = () => {
    callToggleFavorite(isFavorite);
  };

  const callToggleFavorite = async setFavorite => {
    if (!setFavorite) {
      if (state.app.loading) {
        setTimeout(() => callToggleFavorite(setFavorite), 1000);
      } else if (state.app.episodesLoading) {
        setTimeout(() => callToggleFavorite(setFavorite), 1000);
      } else {
        await actions.app.saveFavorite(
          item,
          state.app.episodes,
          state.app.show,
        );
        setDoNotCheck(true);
        setIsFavorite(true);
        setHeader(true);
      }
    } else {
      await actions.app.deleteFavorite(item);
      setIsFavorite(false);
      setHeader(false);
    }
  };

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
      headerRight: () => (
        <TouchableOpacity onPress={() => toggleFavorite()}>
          <Icon
            name={isFavorite ? 'favorite' : 'favorite-border'}
            style={styles.headerIcon}
            size={30}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      ),
    });
  }, [isFavorite, navigation, toggleFavorite]);

  return (
    <View style={styles.container}>
      {item.image && item.image.original != null ? (
        <CacheableImage
          style={{
            zIndex: -1,
            position: 'absolute',
            width: '100%',
            height: '85%',
          }}
          source={{uri: item.image.original}}
          permanent={false}
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
            style={[styles.movieTitle, {textColor: theme.colors.dark_primary}]}>
            No Image
          </Text>
        </View>
      )}
      <DetailsBody
        goToCast={goToCast}
        collapse={collapse}
        setCollapse={setCollapse}
        item={item}
        app={state.app}
        setShowDialog={setShowDialog}
        setDialogContent={setDialogContent}
      />
      <DetailDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        dialogContent={dialogContent}
      />
    </View>
  );
};

export default Details;
