import React from "react";
import { BASE_URL } from "../../../../constant/config";
import { GoTools, GoHistory } from "react-icons/go";
import { GiShop } from "react-icons/gi";
import ServiceItem from "./ServiceItem";
import { RoutesPath } from "../../../../types/RoutesPath.enum";

type Props = any;

export default function RepairShop(props: Props) {
  function handleGoToRepubrish() {
    window.location.href = RoutesPath.REPUBRISH_ITEMS;
  }

  function handleGoToOrders() {
    window.location.href = RoutesPath.REFUBRISH_ORDERS;
  }

  function handleGoToProfile(){
    window.location.href = RoutesPath.PROFILE;
  }

  return (
      <div className=" bg-white shadow-lg full">
        <div className=" flex justify-center bg-slate-50">
          <img src={BASE_URL + "" + props.shopImage} alt="SHOP" className="" />
        </div>
        <h1 className=" font-bold text-center text-xl mt-5">
          {props.shop_name}
        </h1>
        <h3 className=" text-center">{props.shopAddress}</h3>

        <div className=" flex flex-row justify-center mt-10">
          <ServiceItem
            icon={<GoTools />}
            onClick={handleGoToRepubrish}
            name="Refurbish Item"
          />
          <ServiceItem
            icon={<GoHistory />}
            onClick={handleGoToOrders}
            name="Orders Items"
          />
          <ServiceItem
            icon={<GiShop />}
            onClick={handleGoToProfile}
            name="Shop Details"
          />
        </div>
      </div>
  );
}
