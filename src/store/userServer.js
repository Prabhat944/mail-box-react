import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:'user',
    initialState:{inbox:[],sentBox:[]},
    reducers:{
        initialValue(state,action){
            state.inbox=action.payload.inbox;
            state.sentBox=action.payload.sentBox || state.sentBox;
            console.log(state.inbox,state.sentBox);
        },
        sendnewmail(state,action){
            state.sentBox=state.sentBox.push(action.payload);
            console.log(action.payload);
        },
        updateinbox(state,action){
            state.inbox.push(action.payload);
            console.log(action.payload);
        }

    }
});

export const userAction=userSlice.actions;
export default userSlice.reducer;