import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import FocusableElement from '../components/atoms/FocusableElement';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Buffer} from 'buffer';

const Login = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = await AsyncStorage.getItem('token');
      const expirationDate = await AsyncStorage.getItem('expirationDate');
      console.log('acess token', accessToken);
      console.log('expiration date', expirationDate);

      if (accessToken && expirationDate) {
        const currentTime = Date.now();
        if (currentTime < parseInt(expirationDate)) {
          navigation.navigate('MainStack');
        } else {
          AsyncStorage.removeItem('token');
          AsyncStorage.removeItem('expirationDate');
          console.log('token is removed');
        }
      }
    };
    checkTokenValidity();
  }, []);

  const client_id = 'a3df43bac0a347a99cce5541890a8e17';
  const client_secret = '7ee9cb4d2a7c4acda785d5ba23796070';

  async function authenticate() {
    // const config = {
    //   // issuer: 'https://accounts.spotify.com/api/token',
    //   clientId: '1c5bdc4cbf174d77b70b928172189197',
    //   clientSecret: 'cde647cccb074b429165b7c0cab33284',
    //   serviceConfiguration: {
    //     authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    //     tokenEndpoint: 'https://accounts.spotify.com/api/token',
    //   },
    //   scopes: [
    //     'user-read-email',
    //     'user-library-read',
    //     'user-read-recently-played',
    //     'user-top-read',
    //     'playlist-read-private',
    //     'playlist-read-collaborative',
    //     'playlist-modify-public',
    //     'playlist-modify-private',
    //   ],
    //   redirectUrl: 'com.singing:/oauth',
    // };
    // const result = await authorize(config);

    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        null,
        {
          params: {
            grant_type: 'client_credentials',
            scopes: [
              'user-read-email',
              'user-library-read',
              'user-read-recently-played',
              'user-top-read',
              'playlist-read-private',
              'playlist-read-collaborative',
              'playlist-modify-public',
              'playlist-modify-private',
            ],
          },

          headers: {
            Authorization: `Basic ${Buffer.from(
              `${client_id}:${client_secret}`,
            ).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      if (response?.status === 200) {
        console.log('access_token', response?.data);
        const expirationDate = new Date().getTime() + 3600000;
        AsyncStorage.setItem('token', response?.data?.access_token);
        AsyncStorage.setItem('expirationDate', expirationDate?.toString());
        console.log('navigated to home');
        navigation.navigate('MainStack');
      } else {
        throw new Error('Failed to get access token');
      }
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  // const scope = 'user-read-playback-state user-modify-playback-state';

  // const authorizeDevice = async () => {
  //   try {
  //     const response = await fetch('https://accounts.spotify.com/oauth2/device/authorize', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         Authorization: `Basic ${Buffer.from(
  //           `${client_id}:${client_secret}`,
  //         ).toString('base64')}`,
  //       },
  //       body: new URLSearchParams({
  //         client_id: client_id,
  //         scope: scope,
  //         response_type: 'code',
  //       }).toString(),
  //     });
  //     const data = await response?.json();
  //     console.log('Authorization data:', data);
  //     // Store the user_code and device_code for later use
  //   } catch (error) {
  //     console.error('Authorization error:', error);
  //   }
  // };

  // authorizeDevice();

  return (
    <View style={styles.loginView}>
      <View style={styles.btnView}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.logoTitle}>Millions of songs free on Singing</Text>
      </View>
      <View style={styles.btnView}>
        <FocusableElement
          onPress={authenticate}
          unFocusedOverrideStyle={styles.btnStyleSpotify}
          onFocusOverrideStyle={styles.focusedSpotifyBtnStyle}>
          <Entypo name={'spotify'} size={20} color={'#fff'} />
          <Text style={styles.btnText}>Sign in with spotify</Text>
        </FocusableElement>
        <FocusableElement
          // onPress={authorizeDevice}
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
