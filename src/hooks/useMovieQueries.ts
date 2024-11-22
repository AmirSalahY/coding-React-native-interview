import {useInfiniteQuery} from '@tanstack/react-query';
import {getPopularMovies} from '../services/movieApi';
import {MovieResponse} from '../types/movie';

export const usePopularMovies = () => {
  return useInfiniteQuery({
    queryKey: ['movies', 'popular'],
    initialPageParam: 1,
    queryFn: ({pageParam}) => getPopularMovies(pageParam),
    getNextPageParam: (lastPage: MovieResponse) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
};
