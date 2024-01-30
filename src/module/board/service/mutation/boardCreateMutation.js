import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const postArticle = (article) => {
  return axios.post(`/mock/articles`, article);
};

export const useBoardCreateMutation = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postArticle,
    onSuccess: () => {
      console.log('등록 완료');

      queryClient.invalidateQueries(['board']);

      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    },
    onError: () => {
      if (typeof onError === 'function') {
        onError();
      }
    },
  });
};
