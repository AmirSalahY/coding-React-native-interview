import axios from 'axios';
import { Movie, MovieListResponse } from '../types/movie';

const API_KEY = 'ae87bf715caac8fd6efd5cc889db56b0';
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const movieApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getImageUrl = (path: string) => `${BASE_IMAGE_URL}${path}`;
export const getPopularMovies = async (
  page = 1,
): Promise<MovieListResponse> => {
  const response = await movieApi.get<MovieListResponse>('/movie/popular', {
    params: {page},
  });
  return response.data;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await movieApi.get<MovieListResponse>('/search/movie', {
      params: {query: encodeURIComponent(query)},
    });
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};
