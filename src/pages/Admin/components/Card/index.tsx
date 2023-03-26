import React from "react";

type Props = {
  children: React.ReactNode;
};
export default function Card(props: Props) {
  return <div className=" w-full bg-white p-5 shadow-lg">{props.children}</div>;
}
