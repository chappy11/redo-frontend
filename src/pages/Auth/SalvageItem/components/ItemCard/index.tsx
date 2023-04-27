import { useMemo } from "react";
import { Button } from "../../../../../components";
import { BASE_URL } from "../../../../../constant/config";
import { RoutesPath } from "../../../../../types/RoutesPath.enum";
import { dateFormat } from "../../../../../utils/date.util";
import { convertMoney } from "../../../../../utils/money.utils";

type Props = {
  pic1: string;
  name: string;
  brand: string;
  type: string;
  salvageItem_id: string;
  description: string;
  datePosted: string;
  price: string;
  isSold: boolean;
  stock: number;
};

export default function ItemCard(props: Props) {
  const {
    pic1,
    name,
    brand,
    salvageItem_id,
    description,
    datePosted,
    price,
    isSold,
    stock,
  } = props;

  const status = useMemo(() => {
    if (stock < 1) {
      return <span className=" text-green-600">Sold</span>;
    }

    return <span className=" text-green-600">Available</span>;
  }, [stock]);

  const diplayStock = useMemo(() => {
    if (stock < 1) {
      return <p>Out Of Stock</p>;
    }

    return <p>{stock} pcs/pc available</p>;
  }, [stock]);

  return (
    <div className=" w-full bg-white rounded-xl flex shadow-lg p-5 flex-col md:flex-row my-5">
      <img
        src={BASE_URL + pic1}
        alt="pic1"
        className=" w-40 h-44 m-auto md:m-0"
      />
      <div className=" p-2">
        <h1 className=" font-bold text-lg text-center md:text-left lg:text-left">
          {name}
        </h1>
        <h3 className=" text-center  md:text-left lg:text-left">{brand}</h3>
        {diplayStock}
        <div className=" h-3 " />

        <p className=" font-semibold text-center text-red-400 md:text-left lg:text-left">
          PHP {convertMoney(price)}
        </p>
        <div className=" collapse md:visible lg:visible">
          <p className=" mt-2 font-bold">Device Condition:</p>
          <p className=" text-sm">{description}</p>
        </div>
      </div>
      <div className=" flex flex-1  justify-center md:justify-end">
        <div>
          <p className=" text-center md:text-left">
            <span className=" hidden">Date Posted:</span>{" "}
            {dateFormat(datePosted)}
          </p>
          <p>Status: {status}</p>
          <div className=" flex flex-1 items-end mt-5">
            <Button
              onClick={() =>
                (window.location.href =
                  RoutesPath.SALVAGE_ITEM_DETAILS + salvageItem_id)
              }
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
