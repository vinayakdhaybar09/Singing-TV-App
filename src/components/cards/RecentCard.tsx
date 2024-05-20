import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FocusableElement from '../atoms/FocusableElement';
import TrackPlayer from 'react-native-track-player';

const RecentCard = ({item}) => {

  const handlePress = async () => {
    let trackObject = await TrackPlayer.getTrack(0);
    if (trackObject !== null) {
      await TrackPlayer.remove(0);
    }
    await TrackPlayer.add([item?.track?.album])

  };

  return (
    <FocusableElement
      onPress={handlePress}
      unFocusedOverrideStyle={styles.cardView}
      onFocusOverrideStyle={styles.focusedCardView}>
      <Image
        source={{
          uri: `${item?.track?.album?.images[0]?.url}`,
        }}
        style={styles.img}
      />
      <Text numberOfLines={1} style={styles.title}>
        {item?.track?.album?.name}
      </Text>
    </FocusableElement>
  );
};

export default RecentCard;

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: '#202253',
    padding: 4,
    borderRadius: 8,
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center',
    width: 160,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  focusedCardView: {
    backgroundColor: '#202253',
    borderWidth: 2,
    borderColor: '#2c8eb0',
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  title: {
    color: '#eee',
    width: 100,
  },
});
