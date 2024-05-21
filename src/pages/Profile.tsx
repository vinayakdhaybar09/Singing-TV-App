import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import ArtistCard from '../components/cards/ArtistCard';
import axios from 'axios';

const Profile = () => {
  const [artistData, setArtistData] = useState([]);

  const getFollowedArtistData = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://v1.nocodeapi.com/vinayakdhaybar/spotify/TtHzBCCHGUiYlbTl/following`,
        params: {},
      });
      // const response = axios.get("https://v1.nocodeapi.com/vinayak09/spotify/pNewodHhXlKvuWXm/following")
      // console.log("following",response);
      
      setArtistData(response?.data?.artists?.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFollowedArtistData();
  }, []);
  return (
    <View style={styles.profileView}>
      <Text style={styles.profileTitle}>Profile</Text>
      <View style={styles.profileInfoView}>
        <Image
          source={{uri: "https://images.hindustantimes.com/tech/img/2020/06/08/960x540/spotify_1591632106301_1591632111148.jpg"}}
          style={styles.profileImg}
        />
        <View>
          <Text style={styles.infoText}>Vinayak</Text>
        </View>
      </View>
      <View style={styles.topArtistView}>
        <Text style={styles.title}>Followed Artists</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={styles.artistCardView}
          horizontal={true}
          data={artistData}
          renderItem={({item}) => <ArtistCard artistData={item} />}
          keyExtractor={(item, _i) => _i.toString()}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileView: {
    backgroundColor: '#121559',
    flex: 1,
    padding: 30,
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
  },
  profileImg: {
    height: 200,
    width: 200,
    borderRadius: 20,
  },
  infoText: {
    color: '#eee',
    fontSize: 50,
    fontWeight: '700',
  },
  topArtistView: {
    marginVertical: 20,
    gap: 20,
  },
  title: {
    color: '#eee',
    // paddingVertical: 20,
    marginTop: 10,
  },
  artistCardView: {},
});
