import React, { useMemo } from "react";
import { Navigation } from "../../../components";
import useGetFromStorage from "../../../hooks/useGetFromStorage";
import { UserEnum } from "../../../types/UserEnum.enum";
import AdditionalInfoShop from "./AddtionalInfoShop";
import RepairShop from "./RepairShop";

export default function Shop() {
  const { data: user } = useGetFromStorage();

  const displayShop = useMemo(() => {
    if (!user) {
      return;
    }

    if (user.userRoles === UserEnum.USER) {
      return <AdditionalInfoShop />;
    }

    return <RepairShop />;
  }, [user]);
  return (
    <div>
      <Navigation />
      <div className=" h-36" />
      {displayShop}
    </div>
  );
}
