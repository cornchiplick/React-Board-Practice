import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

const getMenus = () => {
  return axios.get(`/mock/menus`).then((res) => res.data);
};

export const useGnbMenusQuery = () => {
  return useSuspenseQuery({
    queryKey: ['gnb', 'menus'],
    queryFn: getMenus,
    staleTime: Infinity,
  });
};
