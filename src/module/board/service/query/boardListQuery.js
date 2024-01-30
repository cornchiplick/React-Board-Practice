import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

const getBoards = (listCtrl) => {
  return axios
    .get(`/mock/articles`, { params: listCtrl.getQueryParam() })
    .then((res) => {
      listCtrl.onChangeTotalCount(res.headers['x-total-count']);
      return res.data;
    });
};

export const useBoardListQuery = (listCtrl) => {
  return useSuspenseQuery({
    queryKey: ['board', 'articles', listCtrl.getQueryParam()],
    queryFn: () => getBoards(listCtrl),
    staleTime: 0,
  });
};
