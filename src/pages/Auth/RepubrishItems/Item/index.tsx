import React from "react";
import { BASE_URL } from "../../../../constant/config";
import { RoutesPath } from "../../../../types/RoutesPath.enum";

type Props = {
  item: any;
};

export default function Item(props: Props) {
  const { item } = props;
  return (
    <div
      className=" w-full bg-white shadow-lg flex my-3"
      onClick={() =>
        (window.location.href =
          RoutesPath.REPUBRISH_ITEMS_DETAILS + item.repubrishItem_id)
      }
    >
      <img src={BASE_URL + item.rpic1} alt="Item" className=" h-44 w-40" />
      <div className=" p-3">
        <p className=" font-bold">{item.rdevice_name}</p>
        <p className=" text-sm">{item.deviceBrand}</p>
        <p className=" text-lg font-bold text-red-400">
          PHP {item.rsalvage_price}
        </p>
        <p className=" font-bold">Issue</p>
        <p className=" text-sm ml-3">{item.rdevice_description}</p>
      </div>
    </div>
  );
}
