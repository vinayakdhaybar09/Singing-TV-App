import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeroCarousal from './HeroCarousal';
import {Image} from 'react-native';

const imagesArr = [
  {url: 'https://c.saavncdn.com/026/Chaleya-From-Jawan-Hindi-2023-20230814014337-500x500.jpg'},
  {url: 'https://c.saavncdn.com/026/Chaleya-From-Jawan-Hindi-2023-20230814014337-500x500.jpg'},
  {url: 'https://c.saavncdn.com/026/Chaleya-From-Jawan-Hindi-2023-20230814014337-500x500.jpg'},
  {url: 'https://c.saavncdn.com/026/Chaleya-From-Jawan-Hindi-2023-20230814014337-500x500.jpg'},
  {url: 'https://c.saavncdn.com/026/Chaleya-From-Jawan-Hindi-2023-20230814014337-500x500.jpg'},
  {url: 'https://c.saavncdn.com/026/Chaleya-From-Jawan-Hindi-2023-20230814014337-500x500.jpg'},
  {url: 'https://c.saavncdn.com/026/Chaleya-From-Jawan-Hindi-2023-20230814014337-500x500.jpg'},
];

const Carousal = () => {
  return (
    <View>
      {/* <Text>Carousal</Text> */}
      <HeroCarousal data={imagesArr} />
      {/* <Image
        source={{uri: 'https://c.saavncdn.com/026/Chaleya-From-Jawan-Hindi-2023-20230814014337-500x500.jpg'}}
        style={{height: 50, width: 50}}
        resizeMode="cover"
      /> */}
    </View>
  );
};

export default Carousal;

const styles = StyleSheet.create({});
