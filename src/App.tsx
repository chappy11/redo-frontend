import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoutesPath } from "./types/RoutesPath.enum";
import Home from "./pages/UnAuth/Home";
import Login from "./pages/UnAuth/Login";
import Register from "./pages/UnAuth/Register";
import Dashboard from "./pages/Auth/Dashboard";
import SellRepubrish from "./pages/Auth/SellRepubrish";

function App() {
  console.log("GG", process.env.BASE_URL);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesPath.HOME} element={<Home />} />
        <Route path={RoutesPath.LOGIN} element={<Login />} />
        <Route path={RoutesPath.REGISTER} element={<Register />} />
        <Route path={RoutesPath.DASHBOARD} element={<Dashboard />} />
        <Route path={RoutesPath.SELL_REPUBRISHED} element={<SellRepubrish />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
