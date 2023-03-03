import React, { ReactNode } from "react";
import Navigation from "../Navigation";

type Props = {
  children: ReactNode;
};

export default function PageContainer(props: Props) {
  const { children } = props;
  return (
    <div>
      <Navigation />
      <div className=" h-36" />
      {children}
    </div>
  );
}
