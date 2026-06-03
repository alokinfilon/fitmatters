import React, { useState, useRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet } from 'react-native';
import HeartIcon from './svg/HeartIcon';

const LikeButton = ({
  initialLiked = false,
  onLikeToggle,
  size = 24,
  activeColor = '#F16646', // Matching the brand theme color (coral/red)
  inactiveColor = '#CCCCCC',
  style,
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    const nextLiked = !liked;
    setLiked(nextLiked);zzzzzz

    // Spring scale pop animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1.25,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.0,
        duration: 90,
        useNativeDriver: true,
      }),
    ]).start();

    if (onLikeToggle) {
      onLikeToggle(nextLiked);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      style={[styles.container, style]}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <HeartIcon
          width={size}
          height={size}
          fill={liked ? activeColor : 'none'}
          stroke={liked ? activeColor : inactiveColor}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4, // Padding to make it easier to tap
  },
});

export default LikeButton;
