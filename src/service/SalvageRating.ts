import axios from "axios"

const headers = {
    'Content-Type':"text/plain"
}
export const createSalvageRating = async(payload:any) =>{
    const resp = await axios.post('salvageitemrating/insert',payload,{headers});

    return resp;
}


export const getSalvageRating = async(salvageItemId:string)=>{
    const resp = await axios.get('salvageitemrating/rating/'+salvageItemId);

    return resp;
}