import { useLocation } from 'react-router-dom';

export function useActiveGnb(path) {
  const { pathname } = useLocation();

  return pathname.startsWith(`/${path}`);
}
