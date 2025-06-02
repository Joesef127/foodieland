import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const useAOS = (options?: AOS.AosOptions) => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: "ease-in-out", 
      once: true, 
      ...options, 
    });

    AOS.refresh();
  }, [options]);
};

export default useAOS;