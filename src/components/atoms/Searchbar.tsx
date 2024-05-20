import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import {useDispatch, useSelector} from 'react-redux';

const Searchbar = ({
  searchInput,
  setSearchInput,
}: {
  searchInput: string;
  setSearchInput: (text: string) => void;
}) => {
  const searchRef = useRef<TextInput>();
  const [focused, setFocused] = useState(false);
  const [inputText, setInputText] = useState("")
  

  const dispatch = useDispatch();

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleSearch = (event: { nativeEvent: { text: string } }) => {
    const { text } = event.nativeEvent;
    console.log('Enter key pressed, value:', text);
    setSearchInput(text)
  };

  const handleSearchInput = (text: string) => {
    setInputText(text);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        searchRef.current?.focus();
      }}
      activeOpacity={1}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={[styles.searchbarView, focused && styles.focusedSearchbarView]}>
      <Icon name="search" size={16} color="#fff" />
      <TextInput
        ref={searchRef}
        style={styles.searchText}
        value={inputText}
        placeholder="Search"
        placeholderTextColor={'#eee'}
        onChangeText={handleSearchInput}
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
