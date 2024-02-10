import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const ArtistCard = ({artistData}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={styles.cardView}>
      <View
        style={[styles.artistImgView, focused && styles.focusedArtistImgView]}>
        <Image
          source={{
            uri: artistData?.songPoster,
          }}
          style={styles.artistImg}
        />
      </View>

      <Text style={styles.artistName}>{artistData?.artistName}</Text>
    </TouchableOpacity>
  );
};

export default ArtistCard;

const styles = StyleSheet.create({
  cardView: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    marginRight: 5,
  },
  artistImg: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  artistImgView: {
    borderWidth: 1.5,
    borderColor: 'transparent',
    borderRadius: 100,
    padding: 2,
  },
  focusedArtistImgView: {
    borderWidth: 1.5,
    borderColor: '#eee',
    borderRadius: 100,
    padding: 2,
  },
  artistName: {
    color: '#eee',
    fontSize: 8,
  },
});
