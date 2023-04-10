import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, PageContainer } from "../../../components";
import useGetFromStorage from "../../../hooks/useGetFromStorage";
import { getRepubrishItem } from "../../../service/RepubrishItem";
import Item from "./Item";
import { Routes } from "react-router-dom";
import { RoutesPath } from "../../../types/RoutesPath.enum";

export default function RepubrishItems() {
  const [data, setData] = useState<any[]>([]);
  const { data: user } = useGetFromStorage();

  const getData = useCallback(async () => {
    try {
      if (!user) {
        return;
      }

      const resp = await getRepubrishItem(user.user_id);

      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    getData();
  }, [getData]);

  const displayData = useMemo(() => {
    return data.map((val, i) => <Item item={val} />);
  }, [data]);

  return (
    <PageContainer>
      <div className=" w-1/3 m-auto ">
        <h1>Repubrish Items</h1>
        <Button
          onClick={() =>
            (window.location.href = RoutesPath.CREATE_REPUBRISH_ITEM)
          }
        >
          Add Item
        </Button>
        <div className=" mt-10" />
        {displayData}
      </div>
    </PageContainer>
  );
}
