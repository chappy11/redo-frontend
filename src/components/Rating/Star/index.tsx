import { AiFillStar,AiOutlineStar } from 'react-icons/ai'
import React, { useMemo } from "react";
import { RatingSize } from '../../../types/RatingSize.enum';

type Props = {
  isFilled:boolean;
  size:string;
}
export default function Star(props:Props) {
  const {isFilled,size} = props;

  const filled = useMemo(() => {
    if(isFilled){
     return (
        <AiFillStar/>
      )
    }

    return  (
        <AiOutlineStar/>
    )
  
  }, [isFilled])
  
  return <p className={`  text-yellow-400 ${size}`}>{filled}</p>;
}
