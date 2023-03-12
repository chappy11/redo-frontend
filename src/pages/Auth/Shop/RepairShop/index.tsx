import React from "react";
import useGetFromStorage from "../../../../hooks/useGetFromStorage";

export default function RepairShop() {
  const user = useGetFromStorage();

  return (
    <div className=" bg-white m-auto w-1/2 p-8">
      <h1 className=" font-bold">Repair Information</h1>
      <div className=" h-10" />
      Shop Name: {user.data?.shop_name}
    </div>
  );
}
