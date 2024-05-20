import {StyleSheet, View} from 'react-native';
import React from 'react';
import Section from '../components/sections/Section';

const Home = () => {
  return (
    <View style={styles.homePage}>
      <Section />
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
