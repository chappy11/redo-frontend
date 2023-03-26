import { RoutesPath } from "../../../../types/RoutesPath.enum";
import { UserInfo } from "../../../../types/User.type";
import NavItem from "./NavItem";
import {
  TbLayoutDashboard,
  TbDeviceLaptop,
  TbDeviceLaptopOff,
} from "react-icons/tb";
import { FaUserCircle, FaUserAltSlash, FaUserCheck } from "react-icons/fa";
import { MdPhonelink, MdPendingActions } from "react-icons/md";
export type NavType = {
  name: string;
  routes: string;
  icon?: any;
  children?: NavType[] | null;
};
const Image = require("../../../../asset/white-logo.png");
type Props = {
  user: UserInfo;
};

const NAV: NavType[] = [
  {
    name: "Dashboard",
    icon: <TbLayoutDashboard />,
    routes: RoutesPath.ADMIN,
    children: null,
  },
  {
    name: "Manage Users",
    icon: <FaUserCircle />,
    routes: RoutesPath.ADMIN,
    children: [
      {
        name: "User List",
        icon: <FaUserCircle />,
        routes: RoutesPath.USERS,
        children: null,
      },
      {
        name: "Inactive Users",
        icon: <FaUserAltSlash />,
        routes: RoutesPath.USER_WITH_STATUS + "0",
        children: null,
      },
      {
        name: "Active Users",
        icon: <FaUserCheck />,
        routes: RoutesPath.USER_WITH_STATUS + "1",
        children: null,
      },
    ],
  },
  {
    name: "Salvage Items",
    routes: RoutesPath.ADMIN,
    icon: <MdPhonelink />,
    children: [
      {
        name: "Pending Items",
        icon: <TbDeviceLaptopOff />,
        routes: RoutesPath.ADMIN,
        children: null,
      },
      {
        name: "Pending Items",
        icon: <TbDeviceLaptop />,
        routes: RoutesPath.ADMIN,
        children: null,
      },
    ],
  },
];

export default function SideBar(props: Props) {
  return (
    <nav className="h-screen bg-primary w-2/12 ">
      <img src={Image} alt="Logo" className=" w-90" />
      <ul>
        {NAV.map((val, i) => (
          <NavItem
            key={i}
            icon={val.icon}
            name={val.name}
            routes={val.routes}
            children={val.children}
          />
        ))}
      </ul>
    </nav>
  );
}
