import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GestureHandlerGestureEvent,
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../config/colors';
import {getImageUrl} from '../services/movieApi';
import {Movie} from '../types/movie';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

interface MovieDetailsModalProps {
  movie: Movie;
  visible: boolean;
  onClose: () => void;
}

const MovieDetailsModal = ({
  movie,
  visible,
  onClose,
}: MovieDetailsModalProps) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1);
      translateY.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
      });
    } else {
      opacity.value = withTiming(0);
      translateY.value = withSpring(SCREEN_HEIGHT);
    }
  }, [visible, opacity, translateY]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const handleGestureEvent = (event: GestureHandlerGestureEvent) => {
    const translationY = event.nativeEvent.translationY as number;
    if (translationY > 100) {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <GestureHandlerRootView style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>

        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <BlurView style={styles.blur} blurType="dark" blurAmount={10} />
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={onClose}
            activeOpacity={1}
          />
        </Animated.View>

        <PanGestureHandler onGestureEvent={handleGestureEvent}>
          <Animated.View style={[styles.modalContainer, modalStyle]}>
            <Image
              source={{uri: getImageUrl(movie.poster_path)}}
              style={styles.posterImage}
            />

            <View style={styles.content}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.year}>
                {new Date(movie.release_date).getFullYear()}
              </Text>
              <Text style={styles.overview}>{movie.overview}</Text>

              <View style={styles.stats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{movie.vote_average}</Text>
                  <Text style={styles.statLabel}>Rating</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{movie.vote_count}</Text>
                  <Text style={styles.statLabel}>Votes</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: SCREEN_HEIGHT * 0.75,
    paddingBottom: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 30,
    marginRight: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    zIndex: 999,
  },
  closeButtonText: {
    color: colors.text.primary,
    fontSize: 24,
    lineHeight: 24,
  },
  posterImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 1.5,
    marginTop: -80,
  },
  content: {
    padding: 24,
    marginTop: -60,
    backgroundColor: colors.background,
    borderRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  year: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  overview: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 22,
    marginBottom: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
  },
});

export default MovieDetailsModal;
