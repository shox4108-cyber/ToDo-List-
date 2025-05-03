import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const useGsapFadeIn = (from = {}, to = {}, deps = [], ) => {
  const elementRef = useRef();

  useEffect(() => {
    if (elementRef.current) {
      gsap.fromTo(elementRef.current, from, { ...to });
    }
  }, deps);
  return elementRef;
};

export default useGsapFadeIn;
