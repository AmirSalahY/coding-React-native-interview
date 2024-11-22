import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, TextInput, View} from 'react-native';
import {Easing, useSharedValue, withTiming} from 'react-native-reanimated';
import SearchPreview from '../components/SearchPreview';
import {colors} from '../config/colors';
import {useMovieQueries} from '../hooks/useMovieQueries';
import {Movie} from '../types/movie';

const MovieListScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const {movies, searchMovies} = useMovieQueries();
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const slideAnim = useSharedValue(0);

  const handleSearch = (text: string) => {
    setSearchTerm(text);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (text.trim()) {
      setIsSearching(true);
      searchTimeoutRef.current = setTimeout(async () => {
        const results = await searchMovies(text);
        setSearchResults(results);
      }, 300);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const handleMoviePress = () => {
    slideAnim.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const renderMovieItem = ({item}: {item: Movie}) => (
    <SearchPreview movie={item} onSelect={handleMoviePress} />
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search movies..."
        value={searchTerm}
        onChangeText={handleSearch}
      />

      {isSearching && searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          renderItem={renderMovieItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          style={{paddingBottom: 50}}
        />
      )}

      {!isSearching && (
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchInput: {
    margin: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.background,
    color: colors.text.primary,
    zIndex: 1000,
  },

  listContainer: {
    padding: 16,
  },
});

export default MovieListScreen;
