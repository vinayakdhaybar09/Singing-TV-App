import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ChartsCard from '../cards/ChartsCard';
import ArtistCard from '../cards/ArtistCard';
import {artistsData, playListData, topMusic} from '../../utils/musicData';
import Player from '../player/Player';
import axios from 'axios';
import Sound from 'react-native-sound';
import TrackPlayer, { Track } from 'react-native-track-player';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const TopCharts = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [trackAv, setTrackAv] = useState<Track | null>()


  const getRecomendedSongs = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://v1.nocodeapi.com/vinayakdhaybar/spotify/TtHzBCCHGUiYlbTl/recommendations?seed_artists=4YRxDV8wJFPHPTeXepOstw&seed_genres=0JQ5DAqbMKFHCxg5H5PtqW&seed_tracks=7yDHHVKLbvDmVw1XXhDDIO&perPage=20`,
        params: {},
      });

      setRecommendations(response?.data?.tracks);
    } catch (error) {
      console.log(error);
    }
  };

  const isTrack = async ()=>{
    const trackObject = await TrackPlayer.getTrack(0);
    setTrackAv(trackObject)
  }

  useEffect(() => {
    getRecomendedSongs();
    isTrack()
  }, []);


  return (
    <View style={styles.topChartsView}>
      <Text style={styles.title}>Top Charts</Text>

      <FlatList
        style={{height: trackAv !== null ?  windowHeight / 2 : windowHeight}}
        showsVerticalScrollIndicator={false}
        data={recommendations}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({item}) => <ChartsCard track={item} />}
      />
    </View>
  );
};

const Rightbar = () => {
  return (
    <View style={styles.rightBarView}>
      <Player />
      <TopCharts />
    </View>
  );
};

export default Rightbar;



const styles = StyleSheet.create({
  rightBarView: {
    backgroundColor: '#121559',
    width: windowWidth * 0.25,
    height: windowHeight,
    paddingHorizontal: 20,
    paddingVertical: 14,
    padding: 2,
  },
  topChartsView: {
    marginVertical: 20,
    gap: 24,
    height: windowHeight,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#eee',
  },
  seeMore: {
    color: '#949494',
    fontSize: 11,
  },
  focusedSeeMore: {
    color: '#2c8eb0',
  },
  chartsCardView: {
    gap: 8,
    overflow: 'hidden',
  },
});
