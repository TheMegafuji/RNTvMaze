import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import theme from '../../themes/default';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ActivityIndicator} from 'react-native-paper';
import CastList from '../CastList';
import SeasonList from '../SeasonList';
import React from 'react';

const DetailsBody = ({
  item,
  collapse,
  setCollapse,
  app,
  goToCast,
  setDialogContent,
  setShowDialog,
}) => {
  return (
    <ScrollView
      style={{
        paddingTop: 300,
        width: '100%',
      }}>
      <Text style={styles.movieTitle}>{item.name}</Text>
      {item.premiered == undefined ? (
        app.show != null &&
        app.show.premiered != null && (
          <Text style={styles.movieInfo}>{`${
            app.show.premiered.split('-')[0]
          } - ${app.show.runtime}m per episode`}</Text>
        )
      ) : (
        <Text style={styles.movieInfo}>{`${item.premiered.split('-')[0]} - ${
          item.runtime
        }m per episode`}</Text>
      )}
      {item.schedule != null &&
        'days' in item.schedule &&
        item.schedule.days.length > 0 && (
          <Text style={styles.movieInfo}>{`Airing ${item.schedule.days.join(
            ', ',
          )} at ${item.schedule.time}`}</Text>
        )}
      <FlatList
        style={{marginLeft: 16}}
        horizontal={true}
        data={item.genres}
        renderItem={({item}) => <Text style={styles.genre}>{item}</Text>}
        keyExtractor={index => index}
      />
      <View
        style={{
          paddingBottom: 500,
          backgroundColor: theme.colors.dark_background,
          borderRadius: 16,
        }}>
        <Text style={styles.header}>Summary</Text>
        <Text numberOfLines={collapse ? 99 : 2} style={styles.summaryText}>
          {item.summary && item.summary.replace(/(&nbsp;|<([^>]+)>)/gi, '')}
        </Text>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => setCollapse(!collapse)}>
          <Icon
            name={collapse ? 'expand-less' : 'expand-more'}
            style={styles.headerIcon}
            size={30}
            color={theme.colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Cast</Text>
        {app.loading ? (
          <ActivityIndicator
            animating={true}
            style={{margin: 16}}
            color={theme.colors.red_primary}
          />
        ) : (
          app.show && <CastList goToCast={goToCast} show={app.show} />
        )}
        {app.episodesLoading ? (
          <View>
            <Text style={styles.header}>Seasons</Text>
            <ActivityIndicator
              animating={true}
              style={{margin: 16}}
              color={theme.colors.red_primary}
            />
          </View>
        ) : (
          app.episodes && (
            <SeasonList
              setDialogContent={setDialogContent}
              showDialog={setShowDialog}
              seriesName={item.name}
              episodes={app.episodes}
            />
          )
        )}
      </View>
    </ScrollView>
  );
};

export default DetailsBody;
