import axios from "axios"

const headers = {
    "Content-Type":'text/plain'
}
export const createRefurbrishRating = async(payload:any)=>{
    const resp = await axios.post('RefurbrishItemRating/rateitem',payload,{headers});

    return resp;
}

export const getRefurbrishRating = async(itemId:string)=>{
    const resp = await axios.get('RefurbrishItemRating/rate/'+itemId);

    return resp;
}