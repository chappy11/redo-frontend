import { ItemCard, Navigation } from "../../../components";
import { BASE_URL } from "../../../constant/config";
import useGetAllSalvageItems from "../../../hooks/salvageitem/useGetAllSalvageItems";
import { RoutesPath } from "../../../types/RoutesPath.enum";

const IMG = require("../../../asset/sample-phone.jpeg");

function Dashboard() {
  const { data } = useGetAllSalvageItems();
  return (
    <div>
      <Navigation />
      <div className=" h-36" />
      <div className=" flex justify-center">
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.map((val) => (
            <ItemCard
              name={val?.deviceName}
              image={BASE_URL + val?.pic1}
              price={val?.salvage_price}
              onClick={() =>
                (window.location.href =
                  RoutesPath.SALVAGE_ITEM_DETAILS + val?.salvageItem_id)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
