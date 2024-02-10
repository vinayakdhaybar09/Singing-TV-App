import {StyleSheet, Text, View, Image, Animated, Easing} from 'react-native';
import React, {useEffect, useState} from 'react';
import PlayerOption from './PlayerOption';
import {useSelector} from 'react-redux';

const ArtistInfo = ({activeSong}) => {
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  });
  return (
    <View style={styles.artistInfoView}>
      <Animated.Image
        source={{
          uri: 'https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg',
        }}
        style={[styles.cardImg, {transform: [{rotate: spin}]}]}
      />
      <View>
        <Text style={styles.songName}>{activeSong?.title}</Text>
        <Text style={styles.songArtist}>{activeSong?.artistName}</Text>
      </View>
    </View>
  );
};

const Player = () => {
  const {activeSong, isPlaying} = useSelector(state => state.palyer);

  return (
    <>
      {activeSong?.title && (
        <View style={styles.playerView}>
          <ArtistInfo activeSong={activeSong} />
          <PlayerOption activeSong={activeSong} />
        </View>
      )}
    </>
  );
};

export default Player;

const styles = StyleSheet.create({
  playerView: {
    backgroundColor: 'rgba(32, 34, 83, 0.9)',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    justifyContent: 'space-between',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  artistInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  cardImg: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },

  songName: {
    color: '#eee',
  },
  songArtist: {
    color: '#949494',
    fontSize: 12,
  },
});
