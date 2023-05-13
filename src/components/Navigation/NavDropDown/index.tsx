import React from "react";
import { NavItemLinksTypes } from "../../../types/NavigationTypes.type";
import { UserInfo } from "../../../types/User.type";
import NavDropDownLinks from "./NavDropDownLinks";
import { RoutesPath } from "../../../types/RoutesPath.enum";

type Props = NavItemLinksTypes & {
  user: UserInfo | null;
};

export default function NavDropDown(props: Props) {
  return (
    <ul
      className=" fixed top-24 right-5 w-40 bg-white z-50
    "
    >
      {props.links.map((val) => (
        <>
          <NavDropDownLinks
            onClick={val.onClick}
            name={val.name}
            url={val.url}
          />
        </>
      ))}
    </ul>
  );
}
