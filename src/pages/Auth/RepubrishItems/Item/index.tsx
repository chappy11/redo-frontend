import React from "react";
import { BASE_URL } from "../../../../constant/config";
import { RoutesPath } from "../../../../types/RoutesPath.enum";
import { Button } from "../../../../components";

type Props = {
  item: any;
};

export default function Item(props: Props) {
  const { item } = props;
  return (
    <div className=" w-full bg-white shadow-lg flex my-3">
      <img src={BASE_URL + item.rpic1} alt="Item" className=" w-40" />
      <div className=" p-3">
        <p className=" font-bold">{item.rdevice_name}</p>
        <p className=" text-sm">{item.deviceBrand}</p>
        <p className=" text-lg font-bold text-red-400">
          PHP {item.rsalvage_price}
        </p>
        <p className=" font-bold">Issue</p>
        <p className=" text-sm ml-3">{item.rdevice_description}</p>
        <div className=" h-5" />
      
          <Button
            onClick={() =>
              (window.location.href =
                RoutesPath.REPUBRISH_ITEMS_DETAILS + item.repubrishItem_id)
            }
          >
            View Details
          </Button>
       
      </div>
    </div>
  );
}
