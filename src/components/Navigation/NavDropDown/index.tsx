import React from "react";
import { NavItemLinksTypes } from "../../../types/NavigationTypes.type";
import NavDropDownLinks from "./NavDropDownLinks";

type Props = NavItemLinksTypes;

export default function NavDropDown(props: Props) {
  return (
    <ul
      className=" fixed top-24 right-5 w-40 bg-white
    "
    >
      {props.links.map((val) => (
        <NavDropDownLinks name={val.name} url={val.url} />
      ))}
    </ul>
  );
}
