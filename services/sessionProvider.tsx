import Cookies from 'js-cookie';

export const getUserId = ()=>{
    return Cookies.get().userId;
}

export const getToken = () =>{
    return Cookies.get().token;
}

export const getChatUserId = () =>{
    return Cookies.get().chatUserId;
}