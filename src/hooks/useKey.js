import { useEffect } from "react";

const useKey = (key, callback) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) callback();
    };

    document.addEventListener("keydown", handleKey);

    return () => document.removeEventListener("keydown", handleKey);
  }, [key, callback]);
};

export default useKey;
