import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MusicCard from '../cards/MusicCard';
import {useGetTopChartsQuery} from '../../redux/services/shazamCore';
import Loader from '../atoms/Loader';
import Error from '../atoms/Error';
import {useDispatch, useSelector} from 'react-redux';
import {discoverMusic, artistsData, playListData} from '../../utils/musicData';
import ArtistCard from '../cards/ArtistCard';
import TrackPlayer, {Track} from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RecentCard from '../cards/RecentCard';

const TopArtist = () => {
  return (
    <View style={styles.topArtistView}>
      <Text style={styles.title}>Top Artists</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={styles.artistCardView}
        horizontal={true}
        data={artistsData}
        renderItem={({item}) => <ArtistCard artistData={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const Section = () => {
  const [recentlyplayed, setRecentlyPlayed] = useState([]);
  const [newRelease, setNewRelease] = useState([]);


  const getRecentlyPlayed = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://v1.nocodeapi.com/vinayakdhaybar/spotify/TtHzBCCHGUiYlbTl/recentlyPlayed?limit=6`,
        params: {},
      });

      // console.log('response recent', response?.data?.items);
      setRecentlyPlayed(response?.data?.items);
    } catch (error) {
      console.log(error);
    }
  };
  const getNewReleased = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://v1.nocodeapi.com/vinayakdhaybar/spotify/TtHzBCCHGUiYlbTl/browse/new?perPage=9`,
        params: {},
      });

      // console.log('new release response', response?.data?.albums?.items);
      setNewRelease(response?.data?.albums?.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecentlyPlayed();
    getNewReleased();
  }, []);

  return (
    <ScrollView>
      <View style={styles.sectionView}>
        <Text style={styles.title}>Recently played</Text>
        <FlatList
          data={recentlyplayed}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            rowGap: 20,
          }}
          keyExtractor={(track, i) => i.toString()}
          renderItem={({item}) => <RecentCard item={item} />}
        />

        <Text style={styles.sectionTitle}>New Releases</Text>
        <FlatList
          style={{height:windowHeight/1.9}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            rowGap: 20,
            flexWrap: 'wrap',
            width: '100%',      
          }}
          data={newRelease}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({item}) => <MusicCard track={item} />}
        />
      </View>
    </ScrollView>
  );
};

export default Section;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  sectionView: {
    height: windowHeight,
    width: windowWidth * 0.6,
    backgroundColor: '#121559',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 14,
    color: '#d1d1d1',
    fontWeight: '500',
    fontSize: 18,
  },
  sectionInnerTitle: {
    color: '#fff',
    fontWeight: '600',
  },
  musicCardView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 24,
  },
  topArtistView: {
    marginVertical: 20,
    gap: 20,
  },
  title: {
    color: '#eee',
    paddingVertical: 20,
  },
  artistCardView: {},
});
