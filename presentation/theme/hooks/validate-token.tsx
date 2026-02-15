import { Redirect } from "expo-router";

export const ValidateCurrentToken = ()=>{
    try{ 
        const getToken = localStorage.getItem(process.env.REACT_APP_TOKEN!);

        if(!getToken) return <Redirect href="/auth/login" />
    
        const { token } = JSON.parse(getToken)
        return token;
    }catch(err){
        console.log(err);
        <Redirect href="/auth/login" />
    }

} 