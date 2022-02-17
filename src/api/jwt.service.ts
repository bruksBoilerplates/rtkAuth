import {USER_TOKEN} from "../Constants/constants";
import Cookies from "js-cookie";
import {UserModel} from "../features/users/users.models";

interface Token {
  user:UserModel,
  token:string
}



export const getToken = ():Token => {
  let jsonToken = window.localStorage.getItem(USER_TOKEN)
  return JSON.parse(jsonToken)
};

export const saveTokenToLocalStorage = (token, user) => {
  // document.cookie = `token=${res.data.token};${expires};path=/`;
  let tokn=JSON.stringify({
    user,
    token,
  })
  Cookies.set(
      "AUTH",
      token
  );
  window.localStorage.setItem(USER_TOKEN, tokn);
};

export const destroyToken = () => {
  window.localStorage.removeItem(USER_TOKEN);
};


export default { getToken, saveToken: saveTokenToLocalStorage, destroyToken };
