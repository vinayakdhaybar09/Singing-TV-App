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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';
import {useDispatch, useSelector} from 'react-redux';
import {playPause} from '../redux/features/playerSlice';

const PlayerButtons = () => {
  const dispatch = useDispatch();
  const [sound, setSound] = useState(null);
  const [focused, setFocused] = useState(false);
  const {activeSong, isPlaying} = useSelector(state => state.palyer);
  const audioUrl = activeSong.songUrl;

  useEffect(() => {
    const soundInstance = new Sound(audioUrl, '', error => {
      if (error) {
        console.log('Error loading sound: ', error);
        return;
      }
      setSound(soundInstance);
    });

    return () => {
      soundInstance.release();
    };
  }, [audioUrl]);

  const handlePlay = () => {
    if (!isPlaying) {
      sound.play();
      dispatch(playPause(true));
    }
  };

  const handlePause = () => {
    if (isPlaying) {
      sound.pause();
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
        // style={[styles.optionStyle, focused && styles.focusedOptionStyle]}
        // activeOpacity={1}
        onFocus={handleFocus}
        onBlur={handleBlur}>
        <Feather name="repeat" size={16} color="#eee" />
      </TouchableOpacity>
      <TouchableOpacity
        // style={[styles.optionStyle, focused && styles.focusedOptionStyle]}
        // activeOpacity={1}
        onFocus={handleFocus}
        onBlur={handleBlur}>
        <Material name="skip-previous" size={22} color="#eee" />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={handlePlay}>
        <Entypo name="controller-play" size={22} color="#eee" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePause}>
        <Entypo name="controller-paus" size={18} color="#eee" />
      </TouchableOpacity> */}

      {/* <TouchableOpacity onPress={handlePress}>
        {isPlaying && activeSong.title ? (
          <Entypo name="controller-paus" size={18} color="#eee" />
        ) : (
          <Entypo name="controller-play" size={22} color="#000" />
        )}
      </TouchableOpacity> */}

      {isPlaying && activeSong.title ? (
        <TouchableOpacity
          // style={[styles.optionStyle, focused && styles.focusedOptionStyle]}
          onPress={handlePause}
          // activeOpacity={1}
          onFocus={handleFocus}
          onBlur={handleBlur}>
          <Entypo name="controller-paus" size={18} color="#eee" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          // style={[styles.optionStyle, focused && styles.focusedOptionStyle]}
          onPress={handlePlay}
          // activeOpacity={1}
          onFocus={handleFocus}
          onBlur={handleBlur}>
          <Entypo name="controller-play" size={22} color="#eee" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        // style={[styles.optionStyle, focused && styles.focusedOptionStyle]}
        // activeOpacity={1}
        onFocus={handleFocus}
        onBlur={handleBlur}>
        <Material name="skip-next" size={22} color="#eee" />
      </TouchableOpacity>
      <TouchableOpacity
        // style={[styles.optionStyle, focused && styles.focusedOptionStyle]}
        // activeOpacity={1}
        onFocus={handleFocus}
        onBlur={handleBlur}>
        <Ionicons name="shuffle" size={22} color="#eee" />
      </TouchableOpacity>
    </View>
  );
};

const Seekbar = () => {
  return (
    <View style={styles.seekBarView}>
      <TouchableOpacity>
        <MaterialIcons name="replay-5" size={16} color="#eee" />
      </TouchableOpacity>
      <Text style={styles.seekBarTime}>0:05</Text>
      <View>
        <Slider
          maximumTrackTintColor={'red'}
          minimumTrackTintColor={'#2c8eb0'}
          thumbTintColor={'#2c8eb0'}
          style={{width: 400}}
          step={0.01}
          minimumValue={0}
          maximumValue={100}
          value={50}
        />
      </View>
      <Text style={styles.seekBarTime}>1.39</Text>
      <TouchableOpacity>
        <MaterialIcons name="forward-5" size={16} color="#eee" />
      </TouchableOpacity>
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
    gap: 20,
    alignItems: 'center',
  },
  seekBarView: {
    flexDirection: 'row',
    gap: 14,
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
