import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import FocusableElement from '../components/atoms/FocusableElement';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
// import {authorize} from 'react-native-app-auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useNavigation} from '@react-navigation/native';
// import {Screens} from '../navigation/Navigation';

const Login = () => {
  // const navigation = useNavigation();

  // useEffect(() => {
  //   const checkTokenValidity = async () => {
  //     const accessToken = await AsyncStorage.getItem('token');
  //     const expirationDate = await AsyncStorage.getItem('expirationDate');
  //     console.log('acess token', accessToken);
  //     console.log('expiration date', expirationDate);

  //     if (accessToken && expirationDate) {
  //       const currentTime = Date.now();
  //       if (currentTime < parseInt(expirationDate)) {
  //         navigation.navigate('Home');
  //       } else {
  //         AsyncStorage.removeItem('token');
  //         AsyncStorage.removeItem('expirationDate');
  //         console.log('token is removed');
  //       }
  //     }
  //   };
  //   checkTokenValidity();
  // }, []);

  // async function authenticate() {
  //   const config = {
  //     issuer: 'https://accounts.spotify.com',
  //     clientId: '1c5bdc4cbf174d77b70b928172189197',
  //     scopes: [
  //       'user-read-email',
  //       'user-library-read',
  //       'user-read-recently-played',
  //       'user-top-read',
  //       'playlist-read-private',
  //       'playlist-read-collaborative',
  //       'playlist-modify-public', // or "playlist-modify-private"
  //     ],
  //     redirectUrl: 'com.Singing://',
  //   };

  //   const result = await authorize(config);

  //   console.log(result);

  //   if (result.accessToken) {
  //     const expirationDate = new Date(
  //       result.accessTokenExpirationDate,
  //     ).getTime();
  //     AsyncStorage.setItem('token', result.accessToken);
  //     AsyncStorage.setItem('expirationDate', expirationDate.toString());
  //     console.log('navigated to home');
  //     navigation.navigate('Home');
  //   }
  // }

  return (
    <View style={styles.loginView}>
      <View style={styles.btnView}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.logoTitle}>Millions of songs free on Singing</Text>
      </View>
      <View style={styles.btnView}>
        <FocusableElement
          onPress={() => undefined}
          unFocusedOverrideStyle={styles.btnStyleSpotify}
          onFocusOverrideStyle={styles.focusedSpotifyBtnStyle}>
          <Entypo name={'spotify'} size={20} color={'#fff'} />
          <Text style={styles.btnText}>Sign in with spotify</Text>
        </FocusableElement>
        <FocusableElement
          unFocusedOverrideStyle={styles.btnStyle}
          onFocusOverrideStyle={styles.focusedBtnStyle}>
          <FontAwesome6 name={'phone'} size={16} color={'#fff'} />

          <Text style={styles.btnText}>Continue with phone number</Text>
        </FocusableElement>
        <FocusableElement
          unFocusedOverrideStyle={styles.btnStyle}
          onFocusOverrideStyle={styles.focusedBtnStyle}>
          <AntDesign name={'google'} size={16} color={'#fff'} />
          <Text style={styles.btnText}>Continue with google</Text>
        </FocusableElement>
        <FocusableElement
          unFocusedOverrideStyle={styles.btnStyle}
          onFocusOverrideStyle={styles.focusedBtnStyle}>
          <AntDesign name={'facebook-square'} size={16} color={'#fff'} />

          <Text style={styles.btnText}>Sign in with facebook</Text>
        </FocusableElement>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginView: {
    backgroundColor: '#0E114e',
    flex: 1,
    flexDirection: 'row',
    columnGap: 50,
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 100,
  },
  logoTitle: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
  },
  btnView: {
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 20,
    width: '36%',
  },
  btnStyleSpotify: {
    backgroundColor: 'green',
    padding: 14,
    borderRadius: 20,
    width: '100%',
    borderWidth: 2,
    borderColor: 'transparent',
    flexDirection: 'row',
    columnGap: 30,
  },
  btnStyle: {
    backgroundColor: 'transparent',
    padding: 14,
    borderRadius: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    columnGap: 30,
  },
  focusedSpotifyBtnStyle: {
    borderWidth: 2,
    backgroundColor: 'green',
    borderColor: '#fff',
  },
  focusedBtnStyle: {
    borderWidth: 2,
    backgroundColor: 'transparent',
    borderColor: '#fff',
  },
  btnText: {
    color: '#fff',
  },
});
