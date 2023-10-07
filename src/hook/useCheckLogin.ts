import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useCheckLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const logout = () => {
    Cookies.remove("hong_access_token");
    setIsLoggedIn(false);
  };

  return { isLoggedIn, logout };
};

export default useCheckLogin;
