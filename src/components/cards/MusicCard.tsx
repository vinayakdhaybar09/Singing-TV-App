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

import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';

const MusicCard = ({track, isPlaying, activeSong, data, i}) => {
  // console.log('track', track);

  const [focused, setFocused] = useState(false);
  const [activeTrack, setActiveTrack] = useState();
  const dispatch = useDispatch();
  const playBackState = usePlaybackState();

  const getCurrentTrack = async () => {
    const cureentTrack = await TrackPlayer.getActiveTrack();
    setActiveTrack(cureentTrack);
  };

  useEffect(() => {
    getCurrentTrack();
  }, []);

  // console.log('activeTrack', activeTrack.id, track.id);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({track, data, i}));
    dispatch(playPause(true));
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
    if (track) {
      await TrackPlayer.skip(track.id - 1);
      await TrackPlayer.play();
    }

    togglePlayBack(playBackState.state);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={[styles.musicCardView, focused && styles.focusedMusicCardView]}
      onPress={handlePress}>
      <View style={styles.imageView}>
        <Image
          source={{
            uri: `${track.songPoster}`,
          }}
          style={[styles.cardImage, focused && styles.focusedImageView]}
        />
        {/* {!focused && track?.id === activeTrack?.id ? (
          <View style={styles.playPausView}>
            <Ionicons name={'musical-notes'} size={40} color="#eee" />
          </View>
        ) : null} */}

        {focused && (
          <View style={styles.playPausView}>
            {/* <TouchableOpacity
              onFocus={handleFocus}
              onBlur={handleBlur}
              onPress={() => togglePlayBack(playBackState.state)}> */}
            <Entypo
              name={
                playBackState.state === State.Playing
                  ? 'controller-paus'
                  : 'controller-play'
              }
              size={18}
              color="#eee"
            />
            {/* </TouchableOpacity> */}
          </View>
        )}
      </View>
      <Text style={styles.songName}>{track?.title}</Text>
      <Text style={styles.songArtist}>{track?.artistName}</Text>
    </TouchableOpacity>
  );
};

export default MusicCard;

const styles = StyleSheet.create({
  musicCardView: {
    width: '30%',
    backgroundColor: '#202253',
    padding: 10,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  focusedMusicCardView: {
    borderWidth: 2,
    borderColor: '#2c8eb0',
  },
  cardImage: {
    aspectRatio: 1,
    borderRadius: 4,
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
    opacity: 0.5,
  },
  playPausView: {
    position: 'absolute',
    // marginLeft:0,
    // marginRight:0

    top: '40%',
    bottom: 0,
    left: '40%',
    right: 0,
  },
});
