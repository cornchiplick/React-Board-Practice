import { atom } from 'recoil';

export const writeAtom = atom({
  key: 'boardWrite',
  default: {
    isShow: false,
    id: '',
  },
});
