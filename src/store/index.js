import {createSlice,configureStore} from '@reduxjs/toolkit';
import userSlice from './userServer';

const Token=localStorage.getItem('Token');
const Email=localStorage.getItem('Email');

const authSlice=createSlice({
name:'auth',
initialState:{login:false,token:Token?Token:null,email:Email?Email:''},
reducers:{
    loginHandler(state,action){
        state.login=true;
        state.token=action.payload.token;
        state.email=action.payload.email;
        localStorage.setItem('Email',action.payload.email);
        localStorage.setItem('Token',action.payload.token);
    },
    logoutHandler(state){
        state.login=false;
        localStorage.removeItem('Token');
        localStorage.removeItem('Email');
    }
}
});

const store=configureStore({
    reducer:{auth:authSlice.reducer,user:userSlice}
});

export const authActions=authSlice.actions;

export default store;