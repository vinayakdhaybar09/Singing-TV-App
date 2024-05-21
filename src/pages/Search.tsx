import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Searchbar from '../components/atoms/Searchbar';
import MusicCard from '../components/cards/MusicCard';
import axios from 'axios';
import TrackPlayer from 'react-native-track-player';

const Search = () => {
  const [searchInput, setSearchInput] = useState('arjith singh');
  const [searchData, setSearchData] = useState([]);

  console.log('searchInput', searchInput);
  const getSearchResult = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://v1.nocodeapi.com/vinayakdhaybar/spotify/TtHzBCCHGUiYlbTl/search?q=${searchInput}`,
        params: {},
      });

      // console.log('response', response?.data);
      // console.log('response', response?.data?.albums?.items);
      setSearchData(response?.data?.albums?.items);
    } catch (error) {
      console.log("error",error);
    }
  };

  useEffect(() => {
    getSearchResult();
  }, [searchInput]);


  return (
    <View style={styles.searchPage}>
      <Searchbar setSearchInput={setSearchInput} searchInput={searchInput} />
      <Text style={styles.sectionTitle}>
        Showing results for{' '}
        <Text style={styles.sectionInnerTitle}>{searchInput}</Text>
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          rowGap: 20,
          flexWrap: 'wrap',
          width: '100%',
        }}
        data={searchData}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({item}) => <MusicCard track={item} />}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchPage: {
    backgroundColor: '#121559',
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 14,
    color: '#d1d1d1',
    fontWeight: '500',
    fontSize: 18,
  },
  sectionInnerTitle: {
    color: '#fff',
    fontWeight: '600',
  },
  musicCardView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 24,
  },
});
