import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

const getBoard = (id) => {
  return axios.get(`/mock/articles/${id}`).then((res) => res.data);
};

export const useBoardSelectQuery = (id) => {
  return useSuspenseQuery({
    queryKey: ['board', 'articles', id],
    queryFn: () => getBoard(id),
    staleTime: 0,
  });
};
