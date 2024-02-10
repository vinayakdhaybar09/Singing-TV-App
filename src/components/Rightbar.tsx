import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import ChartsCard from './ChartsCard';
import ArtistCard from './ArtistCard';
import {artistsData, topMusic} from '../utils/musicData';

const gap = 5;

const TopCharts = () => {
  const [focused, setFocused] = useState(false);
  const [isPress, setIsPress] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };
  return (
    <View style={styles.topChartsView}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Top Charts</Text>
        <TouchableOpacity
          activeOpacity={1}
          onFocus={handleFocus}
          onBlur={handleBlur}>
          <Text style={[styles.seeMore, focused && styles.focusedSeeMore]}>
            See more
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.chartsCardView}>
          {
            topMusic?.map((data, i)=>{
              return(
                <ChartsCard song={data} data={topMusic} i={i} setIsPress={setIsPress} isPress={isPress}/>
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  );
};

const TopArtist = () => {
  const [focused, setFocused] = useState(false);
  // console.log(artistsData);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <View style={styles.topArtistView}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Top Artists</Text>
        <TouchableOpacity
          activeOpacity={1}
          onFocus={handleFocus}
          onBlur={handleBlur}>
          <Text style={[styles.seeMore, focused && styles.focusedSeeMore]}>
            See more
          </Text>
        </TouchableOpacity>
      </View>
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

const Rightbar = () => {
  return (
    <View style={styles.rightBarView}>
      <TopCharts />
      <TopArtist />
    </View>
  );
};

export default Rightbar;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  rightBarView: {
    backgroundColor: '#121559',
    width: windowWidth * 0.25,
    paddingHorizontal: 20,
    paddingVertical: 14,
    padding: 2,
  },
  topChartsView: {
    marginVertical: 20,
    gap: 24,
    height: windowHeight * 0.48,
  },
  topArtistView: {
    marginVertical: 20,
    gap: 24,
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
  artistCardView: {
  },
});
