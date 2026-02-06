import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';

NProgress.configure({
  showSpinner: false,
  speed: 400,
  trickleSpeed: 200,
  minimum: 0.2,
});

export const useRouteProgress = () => {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      NProgress.start();
      window.scrollTo(0, 0);
      const timer = setTimeout(() => {
        NProgress.done();
      }, 300);
      prevPath.current = location.pathname;
      return () => {
        clearTimeout(timer);
        NProgress.done();
      };
    }
  }, [location.pathname]);
};
