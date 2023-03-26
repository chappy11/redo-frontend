import React, { useMemo, useState } from "react";
import useGetFromStorage from "../../../../hooks/useGetFromStorage";
import { UserInfo } from "../../../../types/User.type";
import Content from "../Content";
import SideBar from "../SideBar";

type Props = {
  children: React.ReactNode;
};
export default function Container(props: Props) {
  const { data: user } = useGetFromStorage();

  const displaySideBar = useMemo(() => {
    if (!user) {
      return;
    }

    return <SideBar user={user} />;
  }, [user]);

  const displayContent = useMemo(() => {
    if (!user) {
      return;
    }

    return <Content user={user}>{props.children}</Content>;
  }, [props.children, user]);
  return (
    <div className=" flex">
      {displaySideBar}
      {displayContent}
    </div>
  );
}
