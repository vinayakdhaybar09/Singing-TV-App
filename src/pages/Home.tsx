import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SideBar from '../components/Sidebar';
import Section from '../components/Section';
import Rightbar from '../components/Rightbar';
import Player from '../components/Player';

const Home = () => {
  return (
    <View style={styles.homePage}>
      <SideBar />
      <Section />
      <Rightbar />
      <View style={styles.playerFooterView}>
        <Player />
      </View>
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
