import axios from "axios"

export const getIncome = async()=>{
    const resp = await axios.get('/income/income');

    return resp;
}