import { useMemo, useState } from 'react'
import Star from './Star'
import { RatingSize } from '../../types/RatingSize.enum';

type Props = {
    rate: number;
    isReadOnly?:boolean;
    size?:RatingSize;
    setRate?:(rate:number)=>void;
}


export default function Rating(props:Props) {
    const {isReadOnly,rate,size,setRate} = props;
   
    const getSize = useMemo(()=>{
       
        const ratingSize = size ? size : RatingSize.SMALL;
        
        if(ratingSize === RatingSize.SMALL){
            return 'text-lg';
        }

        if(ratingSize === RatingSize.MEDIUM){
            return 'text-2xl';
        }

        if(ratingSize === RatingSize.LARGE){
            return 'text-6xl';
        }

    },[size])

    function handleSetRate(rate:number){
        if(isReadOnly || !setRate){
            return;
        }
        
        setRate(rate + 1)

    }

    const createRating = useMemo(()=>{
       
       return Array.from(Array(5), (e, i) => {

        return <div onClick={()=>handleSetRate(i)}><Star isFilled={i<rate} size={getSize ? getSize : ''}/></div>
      })
    },[getSize, rate])

    return (
    <div className=' flex flex-row'>{createRating}</div>
  )
}
