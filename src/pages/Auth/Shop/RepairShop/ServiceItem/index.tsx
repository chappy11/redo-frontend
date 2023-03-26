import React from "react";
import { any } from "zod";

type Props = {
  icon: any;
  name: string;
  onClick: () => void;
};
export default function ServiceItem(props: Props) {
  const { icon, name } = props;
  return (
    <div
      className=" flex  flex-col relative justify-center mx-5 hover:bg-slate-300 p-3"
      onClick={props?.onClick}
    >
      <div className=" w-full flex flex-1 justify-center">
        <p className=" text-4xl text-center bg-slate-400 p-4 rounded-full text-primary">
          {icon}
        </p>
      </div>

      <div className="">
        <p className="text-center">{name}</p>
      </div>
    </div>
  );
}
