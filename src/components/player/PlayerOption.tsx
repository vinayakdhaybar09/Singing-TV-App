import {
  StyleSheet,
  Text,
  View,
  Slider,
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import FocusableElement from '../atoms/FocusableElement';

const PlayerButtons = () => {

  const playBackState = usePlaybackState();


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

  return (
    <View style={styles.playerButtonsView}>
      <FocusableElement
        unFocusedOverrideStyle={styles.optionStyle}
        onFocusOverrideStyle={styles.focusedOptionStyle}
        onPress={handleRewind}>
        <MaterialIcons name="replay-5" size={16} color="#eee" />
      </FocusableElement>
      {/* <TouchableOpacity
        onPress={skipToPrevious}
        onFocus={handleFocus}
        onBlur={handleBlur}>
        <Material name="skip-previous" size={22} color="#eee" />
      </TouchableOpacity> */}
      <FocusableElement
        unFocusedOverrideStyle={styles.optionStyle}
        onFocusOverrideStyle={styles.focusedOptionStyle}
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
      </FocusableElement>

      {/* <TouchableOpacity
        // style={[styles.optionStyle, focused && styles.focusedOptionStyle]}
        // activeOpacity={1}
        onPress={skipToNext}
        onFocus={handleFocus}
        onBlur={handleBlur}>
        <Material name="skip-next" size={22} color="#eee" />
      </TouchableOpacity> */}
      <FocusableElement
        unFocusedOverrideStyle={styles.optionStyle}
        onFocusOverrideStyle={styles.focusedOptionStyle}>
        <MaterialIcons name="forward-5" size={16} color="#eee" />
      </FocusableElement>
    </View>
  );
};

const Seekbar = () => {
  const {duration, position} = useProgress();

  return (
    <View style={styles.seekBarView}>
      <Text style={styles.seekBarTime}>
        {new Date(position * 1000).toISOString().substring(15, 19)}
      </Text>
      <View>
        <Slider
          focusable={false}
          maximumTrackTintColor={'#2c8eb0'}
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
    gap:4 ,
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
    backgroundColor: '#2c8eb0',
    padding: 8,
    borderRadius: 50,
  },
});
