import axios from 'axios';
import {MovieResponse} from '../types/movie';

const API_KEY = 'ae87bf715caac8fd6efd5cc889db56b0';
const BASE_URL = 'https://api.themoviedb.org/3';

const movieApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getPopularMovies = async (page = 1): Promise<MovieResponse> => {
  const response = await movieApi.get<MovieResponse>('/movie/popular', {
    params: {page},
  });
  return response.data;
};
