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
import ChartsCard from '../cards/ChartsCard';
import ArtistCard from '../cards/ArtistCard';
import {artistsData, playListData, topMusic} from '../../utils/musicData';
import Player from '../player/Player';

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
          {playListData?.map((data, i) => {
            return (
              <ChartsCard
                song={data}
                data={topMusic}
                i={i}
                setIsPress={setIsPress}
                isPress={isPress}
              />
            );
          })}
        </View>
      </ScrollView>
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
    height: windowHeight * 0.58,
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
