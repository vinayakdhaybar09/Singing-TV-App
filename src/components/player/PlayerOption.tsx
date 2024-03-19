import {
  Button,
  StyleSheet,
  Text,
  Touchable,
  View,
  TouchableOpacity,
  Slider,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Sound from 'react-native-sound';
import {useDispatch, useSelector} from 'react-redux';
import {playPause} from '../../redux/features/playerSlice';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';

const PlayerButtons = () => {
  const dispatch = useDispatch();
  const [focused, setFocused] = useState(false);
  const {activeSong, isPlaying} = useSelector(state => state.palyer);
  const audioUrl = activeSong.url;

  const playBackState = usePlaybackState();

  // console.log('playBackState', playBackState);
  // console.log('State', State.Playing);


  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
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

  const handleRewind = async () => {
    await TrackPlayer.seekBy(-10);
  };

  const handleForward = async () => {
    await TrackPlayer.seekBy(10);
  };

  const handlePlay = () => {
    if (!isPlaying) {
      dispatch(playPause(true));
    }
  };

  const handlePause = () => {
    if (isPlaying) {
      dispatch(playPause(false));
    }
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <View style={styles.playerButtonsView}>
      <TouchableOpacity
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPress={handleRewind}>
        <MaterialIcons name="replay-5" size={16} color="#eee" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={skipToPrevious}
        onFocus={handleFocus}
        onBlur={handleBlur}>
        <Material name="skip-previous" size={22} color="#eee" />
      </TouchableOpacity>

      <TouchableOpacity
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPress={() => togglePlayBack(playBackState.state)}>
        <Entypo
          name={
            playBackState.state === State.Playing
              ? 'controller-paus'
              : 'controller-play'
          }
          size={18}
          color="#eee"
        />
      </TouchableOpacity>

      <TouchableOpacity
        // style={[styles.optionStyle, focused && styles.focusedOptionStyle]}
        // activeOpacity={1}
        onPress={skipToNext}
        onFocus={handleFocus}
        onBlur={handleBlur}>
        <Material name="skip-next" size={22} color="#eee" />
      </TouchableOpacity>
      <TouchableOpacity
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPress={handleForward}>
        <MaterialIcons name="forward-5" size={16} color="#eee" />
      </TouchableOpacity>
    </View>
  );
};

const Seekbar = () => {
  const {duration, position} = useProgress();

  // console.log(duration);

  return (
    <View style={styles.seekBarView}>
      <Text style={styles.seekBarTime}>
        {new Date(position * 1000).toISOString().substring(15, 19)}
      </Text>
      <View>
        <Slider
          focusable={false}
          maximumTrackTintColor={'red'}
          minimumTrackTintColor={'#2c8eb0'}
          thumbTintColor={'#2c8eb0'}
          style={{width: 100}}
          minimumValue={0}
          maximumValue={duration}
          value={position}
        />
      </View>
      <Text style={styles.seekBarTime}>
        {new Date(duration * 1000).toISOString().substring(15, 19)}
      </Text>
    </View>
  );
};

const PlayerOption = ({activeSong}) => {
  return (
    <View style={styles.playerOptionView}>
      <PlayerButtons activeSong={activeSong} />
      <Seekbar />
    </View>
  );
};

export default PlayerOption;

const styles = StyleSheet.create({
  playerOptionView: {
    gap: 14,
    alignItems: 'center',
  },
  playerButtonsView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  seekBarView: {
    flexDirection: 'row',
    gap: 8,
  },
  seekBarTime: {
    color: '#eee',
    fontSize: 12,
  },
  optionStyle: {
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 50,
  },
  focusedOptionStyle: {
    backgroundColor: '#111',
    padding: 8,
    borderRadius: 50,
  },
});
