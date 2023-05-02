import { useMemo, useState } from "react";
import { FaThList, FaShoppingCart } from "react-icons/fa";
import swal from "sweetalert";
import { BASE_URL } from "../../constant/config";
import useGetFromStorage from "../../hooks/useGetFromStorage";
import { AlertIcon } from "../../types/AlertIcon.enum";

import { NavItemTypes } from "../../types/NavigationTypes.type";
import { RoutesPath } from "../../types/RoutesPath.enum";
import { UserEnum } from "../../types/UserEnum.enum";
import { logout } from "../../utils/storage.utils";
import NavDropDown from "./NavDropDown";

const logo = require("../../asset/logo.png");
const LINKS: NavItemTypes[] = [
  {
    name: "Home",
    url: RoutesPath.HOME,
    onClick: () => (window.location.href = RoutesPath.HOME),
  },
  {
    name: "Login",
    url: RoutesPath.LOGIN,
    onClick: () => (window.location.href = RoutesPath.LOGIN),
  },
  {
    name: "Register",
    url: RoutesPath.REGISTER,
    onClick: () => (window.location.href = RoutesPath.REGISTER),
  },
];

const AUTHLINK: NavItemTypes[] = [
  {
    name: "Home",
    url: RoutesPath.HOME,
    onClick: () => (window.location.href = RoutesPath.HOME),
  },
  {
    name: "Salvage Items",
    url: RoutesPath.SHOPS,
    onClick: () => (window.location.href = RoutesPath.SALVAGE_ITEM),
  },
  {
    name: "My Repair Shop",
    url: RoutesPath.SHOPS,
    onClick: () => (window.location.href = RoutesPath.SHOPS),
  },
  {
    name: "On Going Transaction",
    url: RoutesPath.USER_SELLING_TRANSACTION,
    onClick: () => (window.location.href = RoutesPath.USER_SELLING_TRANSACTION),
  },
  {
    name: "Sales Report",
    url: RoutesPath.HISTORY,
    onClick: () => (window.location.href = RoutesPath.HISTORY),
  },

  {
    name: "My Purchases",
    url: "/",
    onClick: () => (window.location.href = RoutesPath.REFUBRISH_TRANSACTIONS),
  },
  {
    name: "Logout",
    url: "/",
    onClick: () => {
      swal({
        title: "Logout",
        text: "Are you sure do want to logout?",
        icon: AlertIcon.WARNING,
        dangerMode: true,
      }).then((val) => {
        logout();
        window.location.href = RoutesPath.HOME;
      });
    },
  },
];

const SELLER: NavItemTypes[] = [
  {
    name: "Home",
    url: RoutesPath.HOME,
    onClick: () => (window.location.href = RoutesPath.HOME),
  },
  {
    name: "Notification",
    url: RoutesPath.HOME,
    onClick: () => (window.location.href = RoutesPath.HOME),
  },
  {
    name: "View Profile",
    url: RoutesPath.HOME,
    onClick: () => (window.location.href = RoutesPath.HOME),
  },
  {
    name: "My Shop",
    url: RoutesPath.SHOPS,
    onClick: () => (window.location.href = RoutesPath.SHOPS),
  },
  {
    name: "Sales Report",
    url: RoutesPath.SHOPS,
    onClick: () => (window.location.href = RoutesPath.HISTORY),
  },
  {
    name: "My Purchases",
    url: RoutesPath.SALVAGE_TRANSACTIONS,
    onClick: () => (window.location.href = RoutesPath.SALVAGE_TRANSACTIONS),
  },
  {
    name: "Logout",
    url: "/",
    onClick: () => {
      swal({
        title: "Logout",
        text: "Are you sure do want to logout?",
        icon: AlertIcon.WARNING,
        dangerMode: true,
      }).then((val) => {
        logout();
        window.location.href = RoutesPath.HOME;
      });
    },
  },
];

export default function Navigation() {
  const { data: user } = useGetFromStorage();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const displayLinks = useMemo(() => {
    if (user?.userRoles === UserEnum.ADMIN) {
      window.location.href = RoutesPath.ADMIN;
      return;
    }
    const linkArray = user
      ? user?.userRoles === UserEnum.USER
        ? AUTHLINK
        : SELLER
      : LINKS;
    if (isOpen) {
      return <NavDropDown links={linkArray} user={user ? user : null} />;
    }
  }, [isOpen, user]);

  const isLog = useMemo(() => {
    if (user) {
      return (
        <>
          <li
            className=" cursor-pointer hover:text-white h-24 w-24 text-3xl p-3 text-green-500 flex items-center justify-center"
            onClick={() => (window.location.href = RoutesPath.CART)}
          >
            <FaShoppingCart />
          </li>
          <li onClick={() => setIsOpen((e) => !e)}>
            {" "}
            <img
              src={BASE_URL + user.profilePic}
              className=" h-16 w-16 mr-10 rounded-full bg-white"
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
