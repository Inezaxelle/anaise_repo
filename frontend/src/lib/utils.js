import Cookies from "js-cookie"

export const getAuthorizationHeader = () => {
    const token = Cookies.get("authToken") || "";
    console.log(token)
    return { Authorization: `Bearer ${token}` };
  };

export const setAuthorizationHeader = (token) => Cookies.set("authToken", token)