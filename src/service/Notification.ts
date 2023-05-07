import axios from "axios"

export const getNotification = async(user_id:string)=>{
    const resp = await axios.get('notification/getnotification/'+user_id);

    return resp;
}