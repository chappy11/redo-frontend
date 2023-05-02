import React, { useMemo } from "react";
import { PageContainer } from "../../../components";
import useGetFromStorage from "../../../hooks/useGetFromStorage";
import { UserEnum } from "../../../types/UserEnum.enum";
import RepairerHistory from "./RepairerHistory";
import SellerHistory from "./SellerHistory";

export default function History() {
  const { data: user } = useGetFromStorage();

  const displayComponent = useMemo(() => {
    if (!user) {
      return;
    }

    if (user.userRoles === UserEnum.REPAIRER) {
      return <RepairerHistory />;
    }

    if (user.userRoles === UserEnum.USER) {
      return <SellerHistory />;
    }
  }, [user]);

  return <>{displayComponent}</>;
}
