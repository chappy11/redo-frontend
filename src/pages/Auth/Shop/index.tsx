import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Navigation, PageContainer } from "../../../components";
import useGetFromStorage from "../../../hooks/useGetFromStorage";
import { getShop } from "../../../service/RepairShop";
import { UserEnum } from "../../../types/UserEnum.enum";
import AdditionalInfoShop from "./AddtionalInfoShop";
import RepairShop from "./RepairShop";
import Pending from "./Pending";

export default function Shop() {
  const { data: user } = useGetFromStorage();
  const [shop, setShop] = useState<any>({});

  const getData = useCallback(async () => {
    try {
      if (!user) {
        return;
      }
      const resp = await getShop(user?.user_id);

      if (resp.data.status == "1") {
        console.log(resp);
        setShop(resp.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    getData();
  }, [user]);

  const displayShop = useMemo(() => {
    if (!user) {
      return;
    }

    if (user.userRoles === UserEnum.USER) {
      return <AdditionalInfoShop />;
    }

    if (user.userRoles === UserEnum.REPAIRER && user.isPending === "1") {
      return <Pending />;
    }
    console.log(shop);
    if (shop) {
      if (shop?.shopIsActive === "1" && user.isPending === "0") {
        return <RepairShop {...shop} />;
      }
    }
  }, [user, shop]);
  return (
    <PageContainer>
      <div className=" mx-5 md:m-auto lg:m-auto md:w-3/4 lg:w-3/4">
      {displayShop}
      </div>
    </PageContainer>
  );
}
