import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import PlayPause from './PlayPause';
import {useDispatch} from 'react-redux';
import {playPause, setActiveSong} from '../redux/features/playerSlice';

const MusicCard = ({song, isPlaying, activeSong, data, i}) => {
  const [focused, setFocused] = useState(false);
  const dispatch = useDispatch();

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
    dispatch(setActiveSong({song, data, i}));
    dispatch(playPause(true));
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
      activeOpacity={1}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={[styles.musicCardView, focused && styles.focusedMusicCardView]}
      onPress={handlePress}>
      <View style={styles.imageView}>
        <Image
          source={{
            uri: `${song.songPoster}`,
          }}
          style={[styles.cardImage, focused && styles.focusedImageView]}
        />
        {focused && (
          <View style={styles.playPausView}>
            <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
            />
          </View>
        )}
      </View>
      {/* <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      /> */}
      <Text style={styles.songName}>{song?.title}</Text>
      <Text style={styles.songArtist}>{song?.artistName}</Text>
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
    top: '40%',
    bottom: 0,
    left: '40%',
    right: 0,
  },
});
