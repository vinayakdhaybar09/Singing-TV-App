import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  findNodeHandle,
} from 'react-native';
import React, {useState, useEffect, MutableRefObject, useRef} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveTab} from '../../redux/features/playerSlice';
import {Screens} from '../../navigation/Navigation';
import {useNavigation} from '@react-navigation/native';

const menuData = [
  
  {
    id: 1,
    iconSvg: 'home',
    title: 'Discover',
    navigateTo: 'Home',
  },
  {
    id: 2,
    iconSvg: 'search1',
    title: 'Search',
    navigateTo: 'Search',
  },
  {
    id: 3,
    iconSvg: 'hearto',
    title: 'Favourite',
    navigateTo: 'Favourite',
  },
  {
    id: 4,
    iconSvg: 'user',
    title: 'Profile',
    navigateTo: 'Profile',
  },
];

const SidebarMenu = ({data}) => {
  const sideBarRef = useRef(null);
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
    dispatch(setActiveTab(data.title));
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

  const useNodeHandle = (ref: MutableRefObject<null>) => {
    const [nodeHandle, setNodeHandle] = useState<number | null>(null);

    useEffect(() => {
      if (ref?.current) {
        setNodeHandle(findNodeHandle(ref?.current));
      }
    }, [ref]);
    return nodeHandle;
  };

  const focusRef = useNodeHandle(sideBarRef);

  const refDown = focused && data.id === 4 ? focusRef : null;

  return (
    <TouchableOpacity
      ref={sideBarRef}
      activeOpacity={1}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPress={handlePress}
      style={styles.menuBtn}
      nextFocusDown={refDown || undefined}>
      <Icon
        name={data.iconSvg}
        size={16}
        color={focused || activeTab === data.title ? '#2c8eb0' : '#d1d1d1'}
      />
      <Animated.Text
        style={[
          activeTab === data.title ? styles.focusedMenuText : styles.menuText,
          focused && animatedStyle,
        ]}>
        {data.title}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const SideBar = ({props}) => {

  console.log("props", props);
  
  const dispatch = useDispatch();

  useEffect(() => {
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
            />
          );
        })}
      </View>
    </View>
  );
};

export default SideBar;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  sidebarView: {
    width: windowWidth * 0.15,
    height: windowHeight,
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
    color: '#eee',
  },
});
