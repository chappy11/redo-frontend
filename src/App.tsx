import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoutesPath } from "./types/RoutesPath.enum";
import Home from "./pages/UnAuth/Home";
import Login from "./pages/UnAuth/Login";
import Register from "./pages/UnAuth/Register";
import Dashboard from "./pages/Auth/Dashboard";
import SellRepubrish from "./pages/Auth/SellRepubrish";
import axios from "axios";
import { BASE_URL } from "./constant/config";
import useGetFromStorage from "./hooks/useGetFromStorage";
import { useMemo } from "react";
import Shop from "./pages/Auth/Shop";

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
              element={<SellRepubrish />}
            />
            <Route path={RoutesPath.SHOPS} element={<Shop />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
