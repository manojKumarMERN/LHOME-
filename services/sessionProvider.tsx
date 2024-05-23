import Cookies from 'js-cookie';
import { AUTH_TOKEN } from '../lib/constants';

export const getUserId = ()=>{
    return Cookies.get().userId;
}

export const getToken = () =>{
    if(typeof window === undefined){
        return null;
    }
    return Cookies.get(AUTH_TOKEN);
}

export const getChatUserId = () =>{
    return Cookies.get().chatUserId;
}