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

axios.defaults.baseURL = BASE_URL;

function App() {
  const { data: user } = useGetFromStorage();

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
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
