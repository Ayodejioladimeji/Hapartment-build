import { useEffect } from "react";

const ScrollToTop = ({ children, route }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route.name]);
  return children || null;
};

export default ScrollToTop;
