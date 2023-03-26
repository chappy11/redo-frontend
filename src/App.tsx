import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoutesPath } from "./types/RoutesPath.enum";
import Home from "./pages/UnAuth/Home";
import Login from "./pages/UnAuth/Login";
import Register from "./pages/UnAuth/Register";
import Dashboard from "./pages/Auth/Dashboard";
import axios from "axios";
import { BASE_URL } from "./constant/config";
import useGetFromStorage from "./hooks/useGetFromStorage";
import Shop from "./pages/Auth/Shop";
import CreateSalvageItem from "./pages/Auth/SalvageItem/CreateSalvageItem";
import SalvageItem from "./pages/Auth/SalvageItem";
import SalvageItemDetails from "./pages/Auth/SalvageItem/SalvageItemDetails";
import Checkout from "./pages/Auth/Checkout";
import ShopSalvageTransactions from "./pages/Auth/ShopSalvageTransactions";
import TrackSalvageTransactions from "./pages/Auth/ShopSalvageTransactions/TrackSalvageTransactions";
import UserSellingOrder from "./pages/Auth/UserSellingOrder";
import UserSellingOrderDetails from "./pages/Auth/UserSellingOrder/UserSellingOrderDetails";
import { UserEnum } from "./types/UserEnum.enum";
import { useMemo } from "react";

import AllUser from "./pages/Admin/user/AllUser";
import UserWithStatus from "./pages/Admin/user/UserWithStatus";
import Admin from "./pages/Admin";
import TransactionHistory from "./pages/Auth/TransactionHistory";
import SellingTransactionDetails from "./pages/Auth/TransactionHistory/SellingTransactionDetails";
import RepubrishItems from "./pages/Auth/RepubrishItems";
import RepubrishItemDetails from "./pages/Auth/RepubrishItems/RepubrishItemDetails";

axios.defaults.baseURL = BASE_URL;

function App() {
  const { data: user } = useGetFromStorage();

  const adminRoutes = useMemo(() => {
    if (user?.userRoles === UserEnum.ADMIN)
      return (
        <>
          <Route path={RoutesPath.ADMIN} element={<Admin />} />
          <Route path={RoutesPath.USERS} element={<AllUser />} />
          <Route
            path={RoutesPath.USER_WITH_STATUS + ":status"}
            element={<UserWithStatus />}
          />
        </>
      );
  }, [user]);
  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <>
            <Route path={RoutesPath.HOME} element={<Home />} />
            <Route path={RoutesPath.LOGIN} element={<Login />} />
            <Route path={RoutesPath.REGISTER} element={<Register />} />
          </>
        ) : (
          <>
            <Route path={RoutesPath.DASHBOARD} element={<Dashboard />} />
            <Route
              path={RoutesPath.SELL_REPUBRISHED}
              element={<CreateSalvageItem />}
            />

            <Route path={RoutesPath.SHOPS} element={<Shop />} />
            <Route path={RoutesPath.SALVAGE_ITEM} element={<SalvageItem />} />
            <Route
              path={RoutesPath.ADD_SALVAGE_ITEM}
              element={<CreateSalvageItem />}
            />
            <Route
              path={RoutesPath.SALVAGE_ITEM_DETAILS + ":id"}
              element={<SalvageItemDetails />}
            />
            <Route
              path={RoutesPath.SALVAGE_TRANSACTIONS}
              element={<ShopSalvageTransactions />}
            />
            <Route
              path={RoutesPath.SALVAGE_TRANSACTIONS_DETAILS + ":id"}
              element={<TrackSalvageTransactions />}
            />
            <Route path={RoutesPath.CHECKOUT + ":id"} element={<Checkout />} />
            <Route
              path={RoutesPath.USER_SELLING_TRANSACTION}
              element={<UserSellingOrder />}
            />
            <Route
              path={RoutesPath.USER_SELLING_TRANSACTION_DETAILS + ":id"}
              element={<UserSellingOrderDetails />}
            />
            <Route
              path={RoutesPath.TRANSACTION_HISTORY}
              element={<TransactionHistory />}
            />
            <Route
              path={RoutesPath.TRANSACTION_DETAILS + ":id"}
              element={<SellingTransactionDetails />}
            />

            <Route
              path={RoutesPath.REPUBRISH_ITEMS}
              element={<RepubrishItems />}
            />

            <Route
              path={RoutesPath.REPUBRISH_ITEMS_DETAILS + ":id"}
              element={<RepubrishItemDetails />}
            />
            {adminRoutes}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
