import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

interface ImgProp {
  url: string;
}
interface IHeroCarousal {
  data: ImgProp[];
}

interface CarCardProps {
  item: ImgProp;
  index: number;
  setActiveIndex: (index: number) => void;
  cardOpacity: Animated.AnimatedInterpolation<number>;
  cardScale: Animated.AnimatedInterpolation<number>;
  cardTranslate: Animated.AnimatedInterpolation<number>;
  cardZindex: number;
}

const CARD_WIDTH = 200;

const getStyles = () =>
  StyleSheet.create({
    carousalView: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    cardStyle: {
      borderRadius: 16,
      width: CARD_WIDTH,
      overflow: 'hidden',
      position: 'relative',
    },
    imgStyle: {
      height: '100%',
      width: '100%',
    },
    focusedCardStyle: {
      width: CARD_WIDTH,
      height: CARD_WIDTH * 0.65,
    },
  });

const CarCard = React.memo(
  ({
    item,
    index,
    setActiveIndex,
    cardOpacity,
    cardScale,
    cardTranslate,
    cardZindex,
  }: CarCardProps) => {
    const [focused, setFocused] = useState(false);
    const styles = getStyles();

    const focusHandler = () => {
      setFocused(true);
      setActiveIndex(index);
    };
    const blurHandler = () => {
      setFocused(false);
    };

    const handlePress = () => {
      console.log('pressed');
    };

    return (
      <Animated.View
        style={[
          styles.cardStyle,
          {
            transform: [{translateX: cardTranslate}, {scaleY: cardScale}],
            opacity: cardOpacity,
            borderWidth: focused ? 2 : undefined,
            borderColor: focused ? 'red' : undefined,
            zIndex: cardZindex,
          },
        ]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handlePress}
          onFocus={focusHandler}
          onBlur={blurHandler}>
          <Image
            source={{uri: item.url}}
            style={styles.imgStyle}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </Animated.View>
    );
  },
);

function HeroCarousal({data}: IHeroCarousal) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollXAnimated = useRef(new Animated.Value(0)).current;

  const dummyData = data;

  const handleEndReached = () => {
    dummyData.push(...data);
  };

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: activeIndex,
      useNativeDriver: true,
      restDisplacementThreshold: 0.1,
    }).start();
  });

  return (
    <View style={{flex: 1, width:500}}>
      <FlatList
        style={{
          minHeight: CARD_WIDTH * 0.65,
        }}
        contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
        // contentInsetAdjustmentBehavior='scrollableAxes'
        // disableScrollViewPanResponder
        horizontal
        scrollEnabled={false}
        data={dummyData}
        renderItem={({item, index}) => {
          const inputRange = [
            index - 2,
            index - 1,
            index,
            index + 1,
            index + 2,
          ];
          const translateX = scrollXAnimated.interpolate({
            inputRange,
            outputRange: [
              -CARD_WIDTH * 1.8,
              -CARD_WIDTH * 0.9,
              0,
              CARD_WIDTH * 0.9,
              CARD_WIDTH * 1.8,
            ],
          });
          const scale = scrollXAnimated.interpolate({
            inputRange,
            outputRange: [0.5, 0.8, 1, 0.8, 0.5],
          });
          const opacity = scrollXAnimated.interpolate({
            inputRange,
            outputRange: [0.3, 1, 1, 1, 0.3],
          });
          // const zIndex = scrollXAnimated.interpolate({
          //   inputRange,
          //   outputRange: [2, 5, 10, 5, 2],
          //   // extrapolate: 'clamp',
          // });

          let zIndex = 0;
          if (index === activeIndex) {
            zIndex = 3;
          } else if (index === activeIndex - 1 || index === activeIndex + 1) {
            zIndex = 2;
          } else if (index === activeIndex - 2 || index === activeIndex + 2) {
            zIndex = 1;
          }

          return (
            <CarCard
              item={item}
              index={index}
              setActiveIndex={setActiveIndex}
              cardOpacity={opacity}
              cardScale={scale}
              cardTranslate={translateX}
              cardZindex={zIndex}
            />
          );
        }}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}

export default HeroCarousal;
