import { userAction } from "./userServer";

export const SendMail=(ToEmail,body)=>{

    return async(dispatch)=>{
        const SendingMail=async()=>{
            const response=await fetch(`https://mail-box-7373c-default-rtdb.firebaseio.com/${ToEmail}/email.json`,{
                method:'POST',
                body:JSON.stringify(body),
            });
            if(!response.ok){
                throw new Error('Failed to send Email');
            }
            const data =response.json();
            return data
        }
        try{const mailOutput=await SendingMail();
        console.log('SuccessFuly Sent',mailOutput);}
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


export const SentBox=(username,id)=>{
    return async(dispatch)=>{
        const Inbox=async()=>{
            const Response=await fetch(`https://mail-box-7373c-default-rtdb.firebaseio.com/${username}/email/${id}.json`);
            if(!Response.ok){
                throw new Error('unable to fetch messsage');
            }
            const data=Response.json();
            return data;
        }
        try{const output=await Inbox();
        console.log(output);}
        catch{
            throw new Error('Error unable to fetch');
        }
    }
};