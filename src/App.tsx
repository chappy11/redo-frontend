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
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
