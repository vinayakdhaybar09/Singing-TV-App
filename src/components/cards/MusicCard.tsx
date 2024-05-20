import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {playPause, setActiveSong} from '../../redux/features/playerSlice';
import PlayPause from '../PlayPause';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TrackPlayer, {
  State,
  Track,
  usePlaybackState,
} from 'react-native-track-player';

const MusicCard = ({track}) => {

  const [focused, setFocused] = useState(false);
  const [activeTrack, setActiveTrack] = useState<Track | undefined>();
  const playBackState = usePlaybackState();

  const getCurrentTrack = async () => {
    const cureentTrack = await TrackPlayer.getActiveTrack();
    setActiveTrack(cureentTrack);
  };

  useEffect(() => {
    getCurrentTrack();
  }, []);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };


  const togglePlayBack = async (playBack: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      if (playBack === State.Paused || playBack === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const handlePress = async () => {
    let trackObject = await TrackPlayer.getTrack(0);
    if (trackObject !== null) {
      await TrackPlayer.remove(0);
    }
    await TrackPlayer.add([track])
    

    togglePlayBack(playBackState.state);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={[styles.musicCardView, focused && styles.focusedMusicCardView]}
      onPress={handlePress}>
      <ImageBackground
        source={{
          uri: `${track?.images[0]?.url}`,
        }}
        style={[styles.cardImage, focused && styles.focusedImageView]}>
        {focused && (
          <View style={styles.playPausView}>
            <Entypo
              name={
                playBackState.state === State.Playing
                  ? 'controller-paus'
                  : 'controller-play'
              }
              size={50}
              color="#eee"
            />
          </View>
        )}
      </ImageBackground>
      <Text numberOfLines={1} style={styles.songName}>
        {track?.name}
      </Text>
      <Text numberOfLines={1} style={styles.songArtist}>
        {track?.artists[0].name}
      </Text>
    </TouchableOpacity>
  );
};

export default MusicCard;

const styles = StyleSheet.create({
  musicCardView: {
    width: 170,
    backgroundColor: '#202253',
    padding: 10,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'transparent',
    opacity:0.7
  },
  focusedMusicCardView: {
    borderWidth: 2,
    borderColor: '#2c8eb0',
  },
  cardImage: {
    height: 170,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  songName: {
    color: '#eee',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 2,
  },
  songArtist: {
    color: '#949494',
    fontSize: 12,
  },
  imageView: {
    position: 'relative',
  },
  focusedImageView: {
    // opacity: 0.5,
  },
  playPausView: {
    // position: 'absolute',
    // // marginLeft:0,
    // // marginRight:0
    // top: '40%',
    // bottom: 0,
    // left: '40%',
    // right: 0,
  },
});
