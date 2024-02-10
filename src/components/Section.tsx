import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import Searchbar from './Searchbar';
import MusicCard from './MusicCard';
import {useGetTopChartsQuery} from '../redux/services/shazamCore';
import Loader from './Loader';
import Error from './Error';
import {useDispatch, useSelector} from 'react-redux';
import {discoverMusic} from '../utils/musicData';

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

  return (
    <View style={styles.sectionView}>
      <Searchbar />
      {/* <Text style={styles.sectionTitle}>
        Showing results for <Text style={styles.sectionInnerTitle}>hello</Text>
      </Text> */}
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={styles.musicCardView}>
          {(searchData).map((song, i) => {
            return (
              <MusicCard
                key={song?.id}
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={discoverMusic}
                i={i}
              />
            );
          })}
        </View>
      {/* </ScrollView> */}
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
});
