import {useEffect, useState} from 'react';
import {
  getPopularMovies,
  searchMovies as searchMoviesApi,
} from '../services/movieApi';
import {Movie} from '../types/movie';

export const useMovieQueries = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await getPopularMovies();
      setMovies(data.results.slice(0, 10));
    };
    loadMovies();
  }, []);

  const searchMovies = async (query: string): Promise<Movie[]> => {
    if (!query.trim()) return [];
    return await searchMoviesApi(query);
  };

  return {
    movies,
    searchMovies,
  };
};
