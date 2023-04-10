import React from "react";

const image = require("../../../../asset/pending.jpg");
export default function Pending() {
  return (
    <div className=" m-auto w-1/2 pt-10">
      <div className=" bg-white shadow-lg p-5 h-96 flex justify-center items-center">
        <div className=" flex justify-center flex-col items-center mx-10">
          <h1 className=" text-center font-bold text-lg">Pending</h1>
          <p>Your application as seller is currently pending</p>
          <img src={image} alt="pending" className=" w-fit" />
        </div>
      </div>
    </div>
  );
}
