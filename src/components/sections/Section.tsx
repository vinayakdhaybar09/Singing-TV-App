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
import Searchbar from '../atoms/Searchbar';
import MusicCard from '../cards/MusicCard';
import {useGetTopChartsQuery} from '../../redux/services/shazamCore';
import Loader from '../atoms/Loader';
import Error from '../atoms/Error';
import {useDispatch, useSelector} from 'react-redux';
import {discoverMusic, artistsData, playListData} from '../../utils/musicData';
import ArtistCard from '../cards/ArtistCard';
import TrackPlayer, {Track} from 'react-native-track-player';

const TopArtist = () => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

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
  const dispatch = useDispatch();

  const {activeSong, isPlaying, searchData} = useSelector(
    state => state.palyer,
  );
  // console.log('activeSong', activeSong);

  // console.log(searchData);

  // const {data, isFetching, error} = useGetTopChartsQuery();

  // if (isFetching) {
  //   return (
  //     <View style={styles.sectionView}>
  //       <Loader />
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.sectionView}>
  //       <Error />
  //     </View>
  //   );
  // }

  // TrackPlayer.play();
  // console.log('track', TrackPlayer.getActiveTrack());

  return (
    <View style={styles.sectionView}>
      <Searchbar />
      <TopArtist />
      <Text style={styles.sectionTitle}>
        Showing results for <Text style={styles.sectionInnerTitle}>hello</Text>
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.musicCardView}>
          {playListData.map((track, i) => {
            return (
              <MusicCard
                key={track?.id}
                track={track}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={discoverMusic}
                i={i}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Section;

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  sectionView: {
    // flex: 1,
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
  },
  artistCardView: {},
});
