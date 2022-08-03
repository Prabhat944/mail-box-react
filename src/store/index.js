import {createSlice,configureStore} from '@reduxjs/toolkit';


const authSlice=createSlice({
name:'auth',
initialState:{login:false,token:null},
reducers:{
    loginHandler(state,action){
        state.login=true;
        state.token=action.payload.token;
        localStorage.setItem('Token',action.payload.token);
    },
    logoutHandler(state){
        state.login=false;
        localStorage.removeItem('Token');
    }
}
});

const store=configureStore({
    reducer:authSlice.reducer
});

export const authActions=authSlice.actions;

export default store;