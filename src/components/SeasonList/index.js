import {FlatList, TouchableOpacity, View, Image} from 'react-native';
import {styles} from './styles';
import {Avatar, List} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import theme from '../../themes/default';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SeasonList = ({episodes, seriesName, showDialog, setDialogContent}) => {
  const [seasons, setSeasons] = useState([]);
  const [collapsed, setCollapsed] = useState({});
  const [changedCollapse, setChangedCollapse] = useState(false);

  useEffect(() => {
    if (seasons.length == 0) {
      let currentSeason = [];
      let seasonList = [];
      let currentSeasonIndex = episodes[0].season;
      episodes.forEach(item => {
        if (item.season == currentSeasonIndex) {
          currentSeason.push(item);
        } else {
          let season = {};
          let collapse = collapsed;
          season.name = `Season ${currentSeasonIndex}`;
          collapse[season.name] = true;
          setCollapsed(collapsed);
          season.episodes = currentSeason;
          seasonList.push(season);
          currentSeason = [];
          currentSeasonIndex = item.season;
        }
      });
      let season = {};
      let collapse = collapsed;
      season.name = `Season ${currentSeasonIndex}`;
      collapse[season.name] = true;
      setCollapsed(collapsed);
      season.episodes = currentSeason;
      seasonList.push(season);
      setSeasons(seasonList);
    }
  }, [collapsed, episodes, seasons]);

  const switchCollapsed = index => {
    let collapse = collapsed;
    collapse[index] = !collapsed[index];
    setChangedCollapse(!changedCollapse);
    setCollapsed(collapsed);
  };

  return (
    <View>
      {seasons.map(item => {
        return (
          <View key={`View${item.name}`}>
            <TouchableOpacity
              style={{paddingTop: 16}}
              key={`season${item.name}`}
              onPress={() => switchCollapsed(item.name)}>
              <List.Item
                title={item.name}
                titleStyle={styles.header}
                right={() => (
                  <Icon
                    name={collapsed[item.name] ? 'expand-more' : 'expand-less'}
                    style={styles.headerIcon}
                    size={30}
                    color={theme.colors.white}
                  />
                )}
              />
            </TouchableOpacity>
            {!collapsed[item.name] && (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={item.episodes}
                style={{backgroundColor: theme.colors.dark_background}}
                keyExtractor={(episode, index) =>
                  `Episode${seriesName}${item.name}${index}`
                }
                renderItem={episode => (
                  <TouchableOpacity
                    style={{
                      margin: 4,
                      backgroundColor:
                        episode.index % 2 == 0
                          ? theme.colors.dark_primary
                          : theme.colors.dark_secondary,
                    }}
                    key={`Episode${seriesName}-TO-${episode.index}`}
                    onPress={() => {
                      showDialog(true);
                      setDialogContent(episode.item);
                    }}>
                    <List.Item
                      title={episode.item.name}
                      titleStyle={styles.episodeTitle}
                      left={() => {
                        return episode.item.image ? (
                          <Image
                            style={{height: 64, width: 96}}
                            source={{uri: episode.item.image.medium}}
                          />
                        ) : (
                          <Avatar.Text size={32} label={episode.index} />
                        );
                      }}
                      right={() => (
                        <Icon
                          name={'info-outline'}
                          style={styles.headerIcon}
                          size={30}
                          color={theme.colors.white}
                        />
                      )}
                    />
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default SeasonList;
