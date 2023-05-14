import React from 'react'
import Button from '../Button';

type Props = {
    header: string[];
    data:any[];
    keys: string[];
    onClick:(id:any)=>void;
    id:string;
    isAlloweView?:boolean;
}
export default function Tabular(props:Props) {
    const {header,data,keys,onClick,id,isAlloweView=true} = props;
  
    return (
    <table className=' w-full'>
        <thead className=' bg-primary  text-white'>
        <tr>
          {header.map((item,i)=>(
       
                <th className=' text-left p-4' key={i.toString()}>{item}</th>
          
          ))} 
        </tr>
        </thead>
        <tbody>
            {data.map((val,x)=>(
                <tr key={x.toString()} className='   p-4'>
                    {keys.map((itm,y)=>(
                        <td key={y.toString()} className=' border border-slate-400 p-4'>{val[itm]}</td>
                    ))}
                    {isAlloweView &&
 <td className=' border border-slate-400 p-4'><p className=' text-blue-600 hover:text-blue-400 cursor-pointer text-center' onClick={()=>onClick(val[id])}>View</p></td>
                    }
                   
                </tr>
            ))}
        </tbody>
    </table>
  )
}
