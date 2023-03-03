import { useMemo, useState } from "react";
import { FaThList, FaShoppingCart } from "react-icons/fa";

import { NavItemTypes } from "../../types/NavigationTypes.type";
import { RoutesPath } from "../../types/RoutesPath.enum";
import NavDropDown from "./NavDropDown";

const logo = require("../../asset/logo.png");
const sampleProfile = require("../../asset/sample-profile.jpg");
const LINKS: NavItemTypes[] = [
  {
    name: "Home",
    url: RoutesPath.HOME,
  },
  {
    name: "Login",
    url: RoutesPath.LOGIN,
  },
  {
    name: "Register",
    url: RoutesPath.REGISTER,
  },
];

const AUTHLINK: NavItemTypes[] = [
  {
    name: "Notification",
    url: RoutesPath.HOME,
  },
  {
    name: "View Profile",
    url: RoutesPath.LOGIN,
  },
  {
    name: "My Product",
    url: RoutesPath.REGISTER,
  },
  {
    name: "History",
    url: "/",
  },
  {
    name: "Logout",
    url: "/",
  },
];
export default function Navigation() {
  const [user, setUser] = useState<any>({
    name: "John Rey Lumangyao",
  });
  // const [user, setUser] = useState<any>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const displayLinks = useMemo(() => {
    const linkArray = user ? AUTHLINK : LINKS;
    if (isOpen) {
      return <NavDropDown links={linkArray} />;
    }
  }, [isOpen, user]);

  const isLog = useMemo(() => {
    if (user) {
      return (
        <>
          <li className=" cursor-pointer hover:text-white h-24 w-24 text-3xl p-3 text-green-500 flex items-center justify-center">
            <FaShoppingCart />
          </li>
          <li onClick={() => setIsOpen((e) => !e)}>
            {" "}
            <img
              src={sampleProfile}
              className=" h-16 w-16 mr-10 rounded-full"
              alt="profile"
            />
          </li>
        </>
      );
    }

    return (
      <p
        className=" text-3xl px-5 cursor-pointer"
        onClick={() => setIsOpen((e) => !e)}
      >
        <FaThList />
      </p>
    );
  }, [user]);
  return (
    <>
      <nav className=" fixed z-50  w-screen flex bg-primary text-white">
        <ul className=" p-4  ">
          <img src={logo} className=" h-20 w-20" alt="redo-logo" />
        </ul>
        <ul className="flex items-center justify-end flex-1">{isLog}</ul>
      </nav>
      {displayLinks}
    </>
  );
}
