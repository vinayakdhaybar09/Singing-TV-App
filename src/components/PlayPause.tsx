import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { State, usePlaybackState } from 'react-native-track-player';
import Entypo from 'react-native-vector-icons/Entypo';

const PlayPause = ({handlePlay, handlePause, song, activeSong, isPlaying}) => {

  const playBackState = usePlaybackState();


  console.log('playBackState', playBackState);
  console.log('State', State.Playing);

  return (
    <View style={styles.playPauseiew}>
      {isPlaying && activeSong.title === song.title ? (
        <TouchableOpacity onPress={handlePause}>
          <Entypo name="controller-paus" size={34} color="#fff" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handlePlay}>
          <Entypo name="controller-play" size={34} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PlayPause;

const styles = StyleSheet.create({
  playPauseiew: {width: '100%'},
  iconStyle: {},
});
