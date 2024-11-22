import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../config/colors';
import {getImageUrl} from '../services/movieApi';
import {Movie} from '../types/movie';
import MovieDetailsModal from './MovieDetailsModal';

interface SearchPreviewProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

const SearchPreview = ({movie, onSelect}: SearchPreviewProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePress = () => {
    setIsModalVisible(true);
    onSelect(movie);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={handlePress}
        activeOpacity={0.7}>
        <Image
          source={{uri: getImageUrl(movie.poster_path)}}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>
            {new Date(movie.release_date).getFullYear()}
          </Text>
        </View>
      </TouchableOpacity>

      <MovieDetailsModal
        movie={movie}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  image: {
    width: 48,
    height: 64,
    borderRadius: 4,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '500',
  },
  year: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
});

export default SearchPreview;
