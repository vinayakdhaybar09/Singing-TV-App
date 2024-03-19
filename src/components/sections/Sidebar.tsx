import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {discoverMusic, favourite, worldwide} from '../../utils/musicData';
import {useDispatch, useSelector} from 'react-redux';
import {serchInput, setActiveTab} from '../../redux/features/playerSlice';
import {Screens} from '../../navigation/Navigation';
import {useNavigation} from '@react-navigation/native';

const menuData = [
  {
    id: 1,
    iconSvg: 'home',
    title: 'Discover',
    itemData: discoverMusic,
    navigateTo: "Home",
  },
  {
    id: 2,
    iconSvg: 'earth',
    title: 'Worldwide',
    itemData: worldwide,
    navigateTo: "settings",
  },
  {
    id: 3,
    iconSvg: 'hearto',
    title: 'Favourite',
    itemData: favourite,
    navigateTo: "favourite",
  },
  {
    id: 4,
    iconSvg: 'setting',
    title: 'Settings',
    itemData: discoverMusic,
    navigateTo: "favourite",
  },
];

const SidebarMenu = ({data}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [focused, setFocused] = useState(false);
  const animatedFontSize = new Animated.Value(16);
  const {activeTab} = useSelector(state => state.palyer);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handlePress = () => {
    navigation.navigate(data.navigateTo);
    // dispatch(serchInput(data.itemData));
    // dispatch(setActiveTab(data.title));
  };

  const handlePressIn = () => {
    Animated.timing(animatedFontSize, {
      toValue: 18,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    setFocused(true);
  };

  const handlePressOut = () => {
    Animated.timing(animatedFontSize, {
      toValue: 16,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    setFocused(false);
  };

  const animatedStyle = {
    color: focused ? '#2c8eb0' : '#d1d1d1',
    fontSize: animatedFontSize,
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPress={handlePress}
      style={styles.menuBtn}>
      <Icon
        name={data.iconSvg}
        size={16}
        color={focused || activeTab === data.title ? '#2c8eb0' : '#d1d1d1'}
      />
      <Animated.Text
        style={[
          // styles.menuText,
          activeTab === data.title ? styles.focusedMenuText : styles.menuText,
          focused && animatedStyle,
        ]}>
        {data.title}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const SideBar = () => {
  const dispatch = useDispatch();

  // const [focused, setFocused] = useState(false);
  useEffect(() => {
    dispatch(serchInput(menuData[0].itemData));
    dispatch(setActiveTab(menuData[0].title));
  }, []);
  return (
    <View style={styles.sidebarView}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <View style={styles.menuView}>
        {menuData.map((data, index) => {
          return (
            <SidebarMenu
              data={data}
              key={index}
              // setFocused={setFocused}
              // focused={focused}
            />
          );
        })}
      </View>
    </View>
  );
};

export default SideBar;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  sidebarView: {
    // flex: 1,
    width: windowWidth * 0.15,
    // alignItems: 'center',
    backgroundColor: '#0E114e',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 50,
    alignSelf: 'center',
  },
  menuView: {
    gap: 20,
    marginTop: 20,
  },
  iconSize: {
    width: 50,
    height: 50,
  },
  menuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    color: '#d1d1d1',
  },
  focusedMenuText: {
    color: '#2c8eb0',
    fontWeight: '600',
    // fontSize: 18,
  },
  menuText: {
    color: '#d1d1d1',
  },
});
