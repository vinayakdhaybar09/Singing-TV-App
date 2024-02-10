import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {playPause, setActiveSong} from '../redux/features/playerSlice';
import Entypo from 'react-native-vector-icons/Entypo';


const ChartsCard = ({song, i, data, setIsPress, isPress}) => {
  const dispatch = useDispatch();
  const [focused, setFocused] = useState(false);
  const {activeSong, isPlaying} = useSelector(state => state.palyer);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handlePress = () => {
    if (isPlaying && activeSong.title === song.title) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
      dispatch(setActiveSong({song, data, i}));
    }
  };


  return (
    <TouchableOpacity
      onPress={() => handlePress()}
      activeOpacity={1}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={[styles.chartsCardView, focused && styles.focusedChartsCardView]}>
      <Text style={styles.chartsCardSr}>{i + 1}</Text>
      <Image
        source={{
          uri: song?.songPoster,
        }}
        style={styles.cardImg}
      />
      <View>
        <Text style={styles.songName}>{song?.title}</Text>
        <Text style={styles.songArtist}>{song?.artistName}</Text>
      </View>
      {isPlaying && activeSong.title === song.title ? (
        <Entypo
          name="controller-paus"
          size={18}
          color="#eee"
          style={styles.playIcon}
        />
      ) : (
        <Entypo
          name="controller-play"
          size={22}
          color="#000"
          style={styles.playIcon}
        />
      )}
    </TouchableOpacity>
  );
};

export default ChartsCard;

const styles = StyleSheet.create({
  chartsCardView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  focusedChartsCardView: {
    backgroundColor: '#2c8eb0',
    borderRadius: 4,
  },
  cardImg: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  chartsCardSr: {
    color: '#eee',
  },
  songName: {
    color: '#eee',
  },
  songArtist: {
    color: '#949494',
    fontSize: 12,
  },
  playIcon: {
    marginLeft: 'auto',
  },
});
