import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Sound from "react-native-sound";

const Temp = () => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
  
    useEffect(() => {
      const soundInstance = new Sound('https://dl.espressif.com/dl/audio/ff-16b-1c-44100hz.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        setSound(soundInstance);
      });
  
      return () => {
        if (soundInstance) {
          soundInstance.release();
        }
      };
    }, []);
  
    const playPauseSound = () => {
      if (!sound) {
        return;
      }
  
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play((success) => {
          if (!success) {
            console.log('Sound did not play successfully');
          }
        });
      }
  
      setIsPlaying(!isPlaying);
    };

  return (
    <View>
      <TouchableOpacity onPress={playPauseSound}>
        <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Temp;

const styles = StyleSheet.create({});
