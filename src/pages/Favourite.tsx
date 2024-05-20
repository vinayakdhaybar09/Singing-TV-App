import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MusicCard from '../components/cards/MusicCard';

const Favourite = () => {
  const [likedSongs, setLikedSongs] = useState([]);

  const getLikedSongs = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://v1.nocodeapi.com/vinayak09/spotify/pNewodHhXlKvuWXm/myLibrary?type=tracks`,
        params: {},
      });

      // // console.log('liked all songs', response?.data?.items);
      setLikedSongs(response?.data?.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLikedSongs();
  }, []);

  // console.log('favourate songs', likedSongs);

  return (
    <ScrollView style={styles.favouriteView}>
      <View style={styles.profileInfoView}>
        <Image
          source={{
            uri: 'https://misc.scdn.co/liked-songs/liked-songs-640.png',
          }}
          style={styles.profileImg}
        />
        <View>
          <Text style={styles.infoText}>Liked Songs</Text>
        </View>
      </View>

      <FlatList
        style={{marginTop: 50}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          rowGap: 20,
          flexWrap: 'wrap',
          width: '100%',
        }}
        data={likedSongs}
        // numColumns={3}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({item}) => <MusicCard track={item?.track?.album} />}
      />
    </ScrollView>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  favouriteView: {
    backgroundColor: '#121559',
    flex: 1,
    padding: 20,
  },
  profileTitle: {
    paddingBottom: 20,
    fontSize: 20,
    fontWeight: '700',
    color: '#eee',
  },
  profileInfoView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    columnGap: 20,
    width: '100%',
  },
  profileImg: {
    height: 120,
    width: 120,
    borderRadius: 20,
  },
  infoText: {
    color: '#eee',
    fontSize: 40,
    fontWeight: '700',
  },
});
