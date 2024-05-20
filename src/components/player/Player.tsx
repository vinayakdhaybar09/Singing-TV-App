import {StyleSheet, Text, View, Image, Animated, Easing} from 'react-native';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import PlayerOption from './PlayerOption';
import TrackPlayer, {Event, Track, useTrackPlayerEvents} from 'react-native-track-player';

type SongInfoProps = PropsWithChildren<{
  track: Track | null | undefined;
}>;

const ArtistInfo = ({track}: SongInfoProps) => {
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
          uri: track?.images[0]?.url,
        }}
        style={[styles.cardImg, {transform: [{rotate: spin}]}]}
      />
      <View>
        <Text style={styles.songName}>{track?.name}</Text>
        <Text style={styles.songArtist}>{track?.artists[0].name}</Text>
      </View>
    </View>
  );
};

const Player = () => {
  const [track, setTrack] = useState<Track | null>();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
        setTrack(playingTrack);
        break;
    }
  });
  return (
    <>
      {track && (
        <View style={styles.playerView}>
          <ArtistInfo track={track} />
          <PlayerOption activeSong={track} />
        </View>
      )} 
    </>
  );
};

export default Player;

const styles = StyleSheet.create({
  playerView: {
    backgroundColor: 'rgba(32, 34, 83, 0.9)',
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  artistInfoView: {
    alignItems: 'center',
    gap: 10,
  },
  cardImg: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },

  songName: {
    color: '#eee',
    textAlign:"center"
  },
  songArtist: {
    color: '#949494',
    fontSize: 12,
    textAlign:"center"                                                                                     
  },
});
