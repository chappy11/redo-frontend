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
import CreateRepubrishItem from "./pages/Auth/RepubrishItems/CreateRepubrishItem";
import RefubrishDashboard from "./pages/Auth/Dashboard/RefubrishDashboard";
import ViewDetails from "./pages/Auth/RepubrishItems/ViewDetails";
import RefubrishCart from "./pages/Auth/Cart/RefubrishCart";
import PendingShop from "./pages/Admin/shop/PendingShop";
import SalvageCart from "./pages/Auth/Cart/SalvageCart";
import RefubrishCheckout from "./pages/Auth/Checkout/RefubrishCheckout";
import RefubrishOrders from "./pages/Auth/RefubrishOrder/RefubrishOrders";
import RefubrishOrderDetails from "./pages/Auth/RefubrishOrder/RefubrishOrders/RefubrishOrderDetails";
import RefubrishTransaction from "./pages/Auth/RefubrishOrder/RefubrishTransaction";
import RefubrishTransactionDetails from "./pages/Auth/RefubrishOrder/RefubrishTransaction/RefubrishTransactionDetails";
import UpdateSalvageDetails from "./pages/Auth/SalvageItem/UpdateSalvageDetails";
import UpdateRefurbrish from "./pages/Auth/RepubrishItems/UpdateRefurbrish";
import ForgotPassword from "./pages/UnAuth/ForgotPassword";
import Profile from "./pages/Profile";
import History from "./pages/Auth/History";
import ShopDetails from "./pages/Admin/shop/PendingShop/ShopDetails";
import RefurbrishReport from "./pages/Admin/RefurbrishReport";
import SalvageReport from "./pages/Admin/SalvageReport";

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
          <Route path={RoutesPath.PENDING_SHOP} element={<PendingShop />} />
          <Route path={RoutesPath.ADMIN_SHOP_DETAILS + ":id"} element={<ShopDetails/>}/>
          <Route path={RoutesPath.REFURBRISH_REPORT} element={<RefurbrishReport/>}/>
          <Route path={RoutesPath.SALVAGE_REPORT} element={<SalvageReport/>}/>
        </>
      );
  }, [user]);

  const displayDashboard = useMemo(() => {
    if (user?.userRoles === UserEnum.USER) {
      return <RefubrishDashboard />;
    }

    return <Dashboard />;
  }, [user?.userRoles]);

  const dipslayCheckout = useMemo(() => {
    return user?.userRoles === UserEnum.REPAIRER ? (
      <Checkout />
    ) : (
      <RefubrishCheckout />
    );
  }, [user?.userRoles]);
  const displayCart = useMemo(() => {
    if (user?.userRoles === UserEnum.REPAIRER) {
      return <SalvageCart />;
    }

    if (user?.userRoles === UserEnum.USER) {
      return <RefubrishCart />;
    }
  }, [user?.userRoles]);
  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <>
            <Route path={RoutesPath.HOME} element={<Home />} />
            <Route path={RoutesPath.LOGIN} element={<Login />} />
            <Route path={RoutesPath.REGISTER} element={<Register />} />
            <Route
              path={RoutesPath.FORGOT_PASSWORD}
              element={<ForgotPassword />}
            />
          </>
        ) : (
          <>
            <Route path={RoutesPath.DASHBOARD} element={displayDashboard} />
            <Route path={RoutesPath.PROFILE} element={<Profile />} />
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
              path={RoutesPath.UPDATE_SALVAGE_DETAILS + ":id"}
              element={<UpdateSalvageDetails />}
            />
            <Route
              path={RoutesPath.SALVAGE_TRANSACTIONS_DETAILS + ":id"}
              element={<TrackSalvageTransactions />}
            />
            <Route
              path={RoutesPath.CHECKOUT + ":id"}
              element={dipslayCheckout}
            />
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
            <Route path={RoutesPath.HISTORY} element={<History />} />
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
            <Route
              path={RoutesPath.REPUBRISH_VIEW_DETAILS + ":id"}
              element={<ViewDetails />}
            />
            <Route
              path={RoutesPath.CREATE_REPUBRISH_ITEM}
              element={<CreateRepubrishItem />}
            />

            {/* cart */}
            <Route path={RoutesPath.CART} element={displayCart} />

            <Route
              path={RoutesPath.REFUBRISH_ORDERS}
              element={<RefubrishOrders />}
            />
            <Route
              path={RoutesPath.REFUBRISH_ORDER + ":id"}
              element={<RefubrishOrderDetails />}
            />
            <Route
              path={RoutesPath.REFUBRISH_TRANSACTIONS}
              element={<RefubrishTransaction />}
            />
            <Route
              path={RoutesPath.REFUBRISH_TRANSACTION + ":id"}
              element={<RefubrishTransactionDetails />}
            />
            <Route
              path={RoutesPath.UPDATE_REFURBRISH + ":id"}
              element={<UpdateRefurbrish />}
            />
            {adminRoutes}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
