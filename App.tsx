import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';

import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import AppNavigator from './src/navigation/Navigation';
import {addTrack, setupPlayer} from './musicPlayerServices';

function App(): JSX.Element {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  async function setup() {
    let isSetup = await setupPlayer();

    if (isSetup) {
      await addTrack();
    }

    setIsPlayerReady(isSetup);
  }

  useEffect(() => {
    setup();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.activityIndicator}>
        <ActivityIndicator size={'large'} />
      </SafeAreaView>
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
