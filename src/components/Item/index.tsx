import React from "react";
type Props = {
  label: string;
  value: string;
};

export default function Item(props: Props) {
  return (
    <div className=" w-full flex my-2">
      <div className=" flex w-full flex-1 ">
        <p className=" font-semibold text-secondary">{props.label}</p>
      </div>

      <p className=" text-primary">{props.value}</p>
    </div>
  );
}
