import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const patchArticleRead = (id) => {
  return axios.patch(`/mock/articles/${id}`, { isRead: true });
};

export const useBoardReadMutation = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => patchArticleRead(id),
    onSuccess: () => {
      console.log('읽음 처리 완료');

      queryClient.invalidateQueries(['board']);

      // if (typeof onSuccess === 'function') {
      //   onSuccess();
      // }
    },
    onError: () => {
      // if (typeof onError === 'function') {
      //   onError();
      // }
    },
  });
};
