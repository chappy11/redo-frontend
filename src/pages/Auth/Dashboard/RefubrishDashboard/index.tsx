import React from "react";
import { ItemCard, PageContainer } from "../../../../components";
import useGetAllRefubrishItem from "../../../../hooks/RefubrishItem/useGetAllRefubrishItem";
import { BASE_URL } from "../../../../constant/config";
import { RoutesPath } from "../../../../types/RoutesPath.enum";

export default function RefubrishDashboard() {
  const { data: item } = useGetAllRefubrishItem();
  return (
    <PageContainer>
      <div>
        <div className=" flex justify-center">
          <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {item.map((val, i) => (
              <ItemCard
                name={val.rdevice_name}
                image={BASE_URL + val.rpic1}
                price={val.selling_price}
                onClick={() =>
                  (window.location.href =
                    RoutesPath.REPUBRISH_VIEW_DETAILS + val.repubrishItem_id)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
