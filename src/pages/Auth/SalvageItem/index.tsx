import { useMemo } from "react";
import { Button, PageContainer } from "../../../components";
import useGetSalvageItemByUser from "../../../hooks/salvageitem/useGetSalvageItemByUser";
import { RoutesPath } from "../../../types/RoutesPath.enum";
import ItemCard from "./components/ItemCard";

export default function SalvageItem() {
  const { data: salvageitem } = useGetSalvageItemByUser();

  const displayItems = useMemo(() => {
    if (!salvageitem) {
      return;
    }

    return salvageitem.map((val, i) => (
      <ItemCard
        pic1={val.pic1}
        salvageItem_id={val.salvageItem_id}
        description={val.deviceDescription}
        datePosted={val.salvageItem_created}
        price={val.salvage_price}
        name={val.deviceName}
        brand={val.deviceBrand}
        type={val.deviceType}
        isSold={true}
      />
    ));
  }, [salvageitem]);

  function handleAddItem() {
    window.location.href = RoutesPath.ADD_SALVAGE_ITEM;
  }
  return (
    <PageContainer>
      <div className=" m-auto w-1/2">
        <div className=" flex">
          <div className=" flex flex-1">
            <h1 className=" font-bold">Salvage Item</h1>
          </div>
          <div className="flex flex-1 items-end justify-end">
            <Button onClick={handleAddItem}>Add Item</Button>
          </div>
        </div>
        <div className=" h-5" />
        {displayItems}
      </div>
    </PageContainer>
  );
}
