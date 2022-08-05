import { userAction } from "./userServer";

export const SendMail=(ToEmail,body)=>{

    return async(dispatch)=>{
        const SendingMail=async()=>{
            await fetch(`https://mail-box-7373c-default-rtdb.firebaseio.com/${ToEmail}/email.json`,{
                method:'POST',
                body:JSON.stringify(body),
            })
            .then(res=>{
                if(res.ok){
                   return res.json().then(data=>dispatch(userAction.updatestatus({type:'success',msg:"Successfully Sent"})))
                }
            }).catch(err=>dispatch(userAction.updatestatus({type:'failed',msg:"Failed To Send"})))
        }
        try{await SendingMail();
        }
        catch{
            throw new Error('Failed');
            
        }
    }
};

export const updateinbox=(user)=>{

    return async(dispatch)=>{
        const RecievingMail=async()=>{
            const response=await fetch(`https://mail-box-7373c-default-rtdb.firebaseio.com/${user}/email.json`);
            if(!response.ok){
                throw new Error('Failed to recieve Email');
            }
            const data =response.json();
            return data
        }
        try{const Recieved=await RecievingMail();
            let data=[];
         for(let key in Recieved){
            data.push({id:key,...Recieved[key]});
         }
        dispatch(userAction.initialValue({inbox:data}))
        }
        catch{
            throw new Error('Failed');
        }
    }
};

export const updateSeenMsg=(user,id,body)=>{
    return async(dispatch)=>{
        const SeenUpdate=async()=>{
            const response=await fetch(`https://mail-box-7373c-default-rtdb.firebaseio.com/${user}/email/${id}.json`,{
                method:'PUT',
                body:JSON.stringify(body),
            });
            if(!response.ok){
                throw new Error('Unable to update seen msg');
            }
            const data=response.json();
            return data;
        }
        try{
            await SeenUpdate();
        }
        catch{throw new Error('Failed to update seen')}
    }
}

export const DeleteFromInbox=(username,id)=>{
    return async(dispatch)=>{
        const Inbox=async()=>{
            await fetch(`https://mail-box-7373c-default-rtdb.firebaseio.com/${username}/email/${id}.json`,{
                method:'DELETE'
            })
            .then(res=>{
                if(res.ok){
                   res.json().then(data=>dispatch(userAction.updatestatus({type:'success',msg:'Deleted Succesfully'})))
                }
            })
            .catch(err=>{dispatch(userAction.updatestatus({type:'failed',msg:'Failed to Delete from server'}))})
        }
        await Inbox()
    }
};