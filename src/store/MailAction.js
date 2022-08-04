
export const SendMail=(user,body)=>{

    return async(dispatch)=>{
        const SendingMail=async()=>{
            const response=await fetch(`https://mail-box-7373c-default-rtdb.firebaseio.com/${user}/email.json`,{
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
}