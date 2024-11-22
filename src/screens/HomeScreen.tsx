import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../config/colors';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const HomeScreen = () => {
  const colorScale = useSharedValue(0);
  const welcomeTranslateY = useSharedValue(20);

  React.useEffect(() => {
    colorScale.value = withRepeat(
      withSequence(
        withTiming(1, {duration: 2000}),
        withTiming(0, {duration: 2000}),
      ),
      -1,
      true,
    );

    welcomeTranslateY.value = withSpring(0, {
      damping: 10,
      stiffness: 100,
    });
  }, [colorScale, welcomeTranslateY]);

  const backgroundStyle = useAnimatedStyle(() => {
    const interpolateColor = (colorScale.value * 360) % 360;
    return {
      backgroundColor: `hsl(${interpolateColor}, 70%, 80%)`,
    };
  });

  const welcomeStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: welcomeTranslateY.value}],
    };
  });

  return (
    <Animated.View style={[styles.container, backgroundStyle]}>
      <View style={styles.content}>
        <Animated.Text style={[styles.welcomeText, welcomeStyle]}>
          Welcome to
        </Animated.Text>

        <Animated.Text style={[styles.appName, welcomeStyle]}>
          Movie Explorer
        </Animated.Text>

        <Animated.Text style={[styles.subtitle, welcomeStyle]}>
          Discover your next favorite movie
        </Animated.Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    color: colors.text.primary,
    marginBottom: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
    width: SCREEN_WIDTH * 0.8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.text.secondary,
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default HomeScreen;
