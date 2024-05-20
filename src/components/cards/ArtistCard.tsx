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
            uri: artistData?.images[0]?.url,
          }}
          style={styles.artistImg}
        />
      </View>

      <Text style={styles.artistName}>{artistData?.name}</Text>
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
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  artistImgView: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 100,
    padding: 4,
  },
  focusedArtistImgView: {
    borderWidth: 2,
    borderColor: '#2c8eb0',
    borderRadius: 100,
    padding: 4,
  },
  artistName: {
    color: '#eee',
    fontSize: 8,
  },
});
