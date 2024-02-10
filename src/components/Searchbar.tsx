import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import {discoverMusic} from '../utils/musicData';
import {useDispatch, useSelector} from 'react-redux';
import {serchInput} from '../redux/features/playerSlice';

const Searchbar = () => {
  const searchRef = useRef<TextInput | undefined>();
  const [searchInput, setSearchInput] = useState('');
  const [focused, setFocused] = useState(false);
  const {searchData} = useSelector(state => state.palyer);

  const dispatch = useDispatch();

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleSearch = () => {
    // Perform search or any other action here
    // console.log('Search:', searchInput);
  };

  // const matchingSongs = discoverMusic.filter(song =>
  //   song.title.toLowerCase().includes(searchInput.toLowerCase())
  // );

  const handleSearchInput = text => {
    setSearchInput(text);
    // console.log(text);
    const matchingSongs = searchData.filter(song =>
      song.title.toLowerCase().includes(text.toLowerCase()),
    );

    // console.log(matchingSongs);
    dispatch(serchInput(matchingSongs));
  };

  return (
    <TouchableOpacity
      onPress={() => {
        searchRef.current?.focus();
      }}
      activeOpacity={1}
      onFocus={handleFocus}
      onBlur={handleBlur}
      // onKeyPress={e => console.log('key press : ', e)}
      style={[styles.searchbarView, focused && styles.focusedSearchbarView]}>
      <Icon name="search" size={16} color="#fff" />
      <TextInput
        ref={searchRef}
        style={styles.searchText}
        // value={searchInput}
        placeholder="Search"
        placeholderTextColor={'#eee'}
        onChangeText={text => {
          console.log(text);
        }}
        onKeyPress={e => e.preventDefault()}
        onSubmitEditing={handleSearch}
      />
    </TouchableOpacity>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  searchbarView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#202253',
    // marginHorizontal: 20,
    // marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  focusedSearchbarView: {
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchText: {
    color: '#fff',
    width: '100%',
  },
});
