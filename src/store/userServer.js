import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:'user',
    initialState:{inbox:[],sentBox:[],unseenMsg:0,status:null,update:0},
    reducers:{
        initialValue(state,action){
            state.inbox=action.payload.inbox;
            state.sentBox=action.payload.sentBox || state.sentBox;
            const msgArray=action.payload.inbox;
            let count=0;
            for(let key in msgArray){
                if(msgArray[key].seen === false){
                     count=count + 1;
                };
            }
            state.unseenMsg=count;
        },
        sendnewmail(state,action){
            state.sentBox=state.sentBox.push(action.payload);
            console.log(action.payload);
        },
        updateinbox(state,action){
            state.inbox.push(action.payload);
            console.log(action.payload);
        },
        updateunseenmsg(state,action){
            state.unseenMsg=action.payload;
        },
        updatecount(state,action){
            const current=action.payload;
            const index=state.inbox.findIndex(msg=>msg.id === current.id);
            state.inbox[index]={...current,seen:true};
            const msgArray=state.inbox;
            let count=0;
            for(let key in msgArray){
                if(msgArray[key].seen === false){
                     count=count + 1;
                };
            }
            state.unseenMsg=count;

        },
        updatestatus(state,action){
            state.status=action.payload;
        },
        update(state){
            state.update=state.update+1;
        }

    }
});

export const userAction=userSlice.actions;
export default userSlice.reducer;