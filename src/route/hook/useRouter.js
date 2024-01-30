import { useNavigate } from 'react-router-dom';

export function useRouter() {
  const navigate = useNavigate();

  return {
    back: () => navigate(-1),
    forward: () => navigate(1),
    reload: () => window.location.reload(),
    move: (href, option) => navigate(href, option),
    replace: (href) => navigate(href, { replace: true }),
  };
}
