import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import TrackPlayer from 'react-native-track-player';

const ChartsCard = ({track}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handlePress = async () => {
    console.log(" top charts track", track);
    
    // if (isPlaying && activeSong.title === track.title) {
    //   dispatch(playPause(false));
    // } else {
    //   dispatch(playPause(true));
    //   dispatch(setActiveSong({track, data, i}));
    // }

    // if (track) {
    //   await TrackPlayer.skip(track.id - 1);
    //   await TrackPlayer.play();
    // }
    let trackObject = await TrackPlayer.getTrack(0);
    if (trackObject !== null) {
      await TrackPlayer.remove(0);
    }
    await TrackPlayer.add([track?.album])
  };

  return (
    <TouchableOpacity
      onPress={() => handlePress()}
      activeOpacity={1}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={[styles.chartsCardView, focused && styles.focusedChartsCardView]}>
      <Image
        source={{
          uri: track?.album?.images[0]?.url,
        }}
        style={styles.cardImg}
      />
      <View>
        <Text numberOfLines={1} style={styles.songName}>
          {track?.name}
        </Text>
        <Text numberOfLines={1} style={styles.songArtist}>
          {track?.artists[0]?.name}
        </Text>
      </View>
{/*       
      {isPlaying && activeSong.title === track.title ? (
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
      )} */}
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
