import React from "react";
import { BASE_URL } from "../../constant/config";
import {
  BsCartCheckFill,
  BsCartDashFill,
  BsFillCartPlusFill,
} from "react-icons/bs";
import RoundedButton from "../RoundedButton";
import { convertMoney } from "../../utils/money.utils";
import { MdHighlightOff, MdRemoveShoppingCart } from "react-icons/md";

type Props = {
  img: string;
  deviceName: string;
  brand: string;
  price: string;
  total: string;
  quantity: string;
  status: boolean;
  id: string;
  handleStatus: () => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleRemove: () => void;
};

export default function CartItem(props: Props) {
  const {
    img,
    deviceName,
    brand,
    price,
    total,
    quantity,
    status,
    handleStatus,
    handleIncrement,
    handleDecrement,
    handleRemove,
    id,
  } = props;
  return (
    <div className=" bg-white p-5 shadow-lg my-4" key={id}>
      <div className=" flex relative">
        <MdHighlightOff
          className=" absolute top-0 right-0 text-2xl text-red-500 hover:text-slate-500"
          onClick={() => handleRemove()}
        />
        <div>
          <img src={BASE_URL + img} alt="item" className=" w-32 h-36" />
        </div>
        <div className=" flex flex-1 flex-col px-3 ">
          <h1>{deviceName}</h1>
          <p className=" text-sm">{brand}</p>
          <p>Price: {price}</p>
          <p className=" p-2 font-bold text-red-500">
            PHP {convertMoney(total)}
          </p>
          <div className=" flex text-xl w-1/2">
            <div className=" flex items-center mx-2 ">
              <RoundedButton
                className=" bg-primary text-secondary p-2"
                onClick={() => handleIncrement()}
              >
                <BsFillCartPlusFill />
              </RoundedButton>
            </div>
            <div className=" p-3 bg-slate-200 flex-1 ">
              <p className=" text-center">{quantity}</p>
            </div>
            <div className=" flex items-center justify-center mx-2">
              <RoundedButton
                onClick={() => handleDecrement()}
                className=" bg-red-600 text-white p-2"
              >
                <BsCartDashFill />
              </RoundedButton>
            </div>
          </div>
        </div>
        <div className=" flex w-1/6 px-2 justify-center items-center">
          <input
            className=" h-5 w-5"
            type="checkbox"
            id="checkboxDefault"
            checked={status}
            onClick={() => handleStatus()}
          />
        </div>
      </div>
    </div>
  );
}
