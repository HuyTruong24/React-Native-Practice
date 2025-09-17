import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, interpolateColor, withTiming, withSpring, runOnJS } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const ITEM_HEIGHT = 80
const {width} = Dimensions.get("window")
const SWIPE_THRESHOLD = -width * 0.3
function NotificationItem({id, title, time, description, onDelete}) {
  const translateX = useSharedValue(0)
  const itemHeight = useSharedValue(80)
  const marginVertical = useSharedValue(8)
  const opacity = useSharedValue(1)
  const skewX = useSharedValue(0)
  const skewY = useSharedValue(0)

  const swipeGesture = Gesture.Pan().onUpdate(event => {
      translateX.value = event.translationX
      skewX.value = interpolate(translateX.value , [0, SWIPE_THRESHOLD] , [0,25] , Extrapolation.CLAMP)
      skewY.value = interpolate(translateX.value , [0, SWIPE_THRESHOLD] , [0,5] , Extrapolation.CLAMP)
  }).onEnd(() => {
    const shouldDelete = translateX.value < SWIPE_THRESHOLD

    if(shouldDelete) {
      translateX.value = withTiming(-width)
      itemHeight.value = withTiming(0)
      marginVertical.value = withTiming(0)
      opacity.value = withTiming(0, undefined, (isFinished) => {
        if(isFinished && onDelete) {
          runOnJS(onDelete)(id)
          console.log(id)
        }
      })
    } else {
      translateX.value = withSpring(0, {damping: 10, stiffness: 100})
      skewX.value = withTiming(0)
      skewY.value = withTiming(0)
    }
  })

  const animatedItemStyle = useAnimatedStyle(() => ({
      transform: [
          {translateX: translateX.value},
          {skewX: `${skewX.value}deg`},
          {skewY: `${skewY.value}deg`}
      ], 
      backgroundColor: interpolateColor (
          translateX.value,
          [0, SWIPE_THRESHOLD], ['white', 'lightcoral'],
      )
  }))

  const animatedContainerStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    marginVertical: marginVertical.value,
    opacity: opacity.value
  }));

  const animatedTrashStyle = useAnimatedStyle(() => ({
    height: withTiming(translateX.value < SWIPE_THRESHOLD ? 1 : 0),
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [SWIPE_THRESHOLD, SWIPE_THRESHOLD - 50],
          [1, 1.2],
          Extrapolation.CLAMP
        )
      }
    ]
  }));
  return (
    <GestureDetector gesture={swipeGesture}>
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <Animated.View style={[styles.delete, animatedTrashStyle]}>
          <MaterialCommunityIcons name="delete" size={24} color="black" />
        </Animated.View>
        <Animated.View style={[ styles.card, animatedItemStyle ]}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.time}>{time}</Text>
            </View>
            <Text style={styles.description}>{description}</Text>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginVertical: 8,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Android shadow
    borderRadius: 12,
  },
  card: {
    backgroundColor: '#fff',
    
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  delete: {
    height: 80,
    width: 80,
    position: "absolute",
    right: "10%",
    justifyContent: "center",
    alignItems: "center"
  }
});
export default NotificationItem