import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SideBar from '../components/sections/Sidebar';
import Section from '../components/sections/Section';
import Rightbar from '../components/sections/Rightbar';
import Player from '../components/player/Player';

const Home = () => {
  return (
    <View style={styles.homePage}>
      <SideBar />
      <Section />
      <Rightbar />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    backgroundColor: '#252727',
    flexDirection: 'row',
    position: 'relative',
  },
  playerFooterView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
