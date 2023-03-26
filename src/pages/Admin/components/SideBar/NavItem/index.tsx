import React, { useMemo, useState } from "react";
import { icons } from "react-icons";
import { NavType } from "..";
type Props = NavType;
export default function NavItem(props: Props) {
  const { name, routes, children, icon } = props;
  const [showChildren, setShowChildren] = useState<boolean>(false);

  function handleClick() {
    if (!children) {
      window.location.href = routes;
      return;
    }

    setShowChildren(!showChildren);
  }

  const displayChildren = useMemo(() => {
    if (showChildren) {
      return (
        <ul>
          {children?.map((val, i) => (
            <li
              className=" p-3 px-5 cursor-pointer text-white text-center flex items-center  hover:bg-slate-600"
              onClick={() => (window.location.href = val.routes)}
            >
              {val.icon}
              <div className=" w-2" /> {val.name}
            </li>
          ))}
        </ul>
      );
    }
  }, [showChildren, children]);
  return (
    <>
      <li
        className=" text-white p-2 hover:bg-slate-600 flex items-center cursor-pointer"
        onClick={handleClick}
      >
        {icon}
        <div className=" w-5" />
        {name}
      </li>
      {displayChildren}
    </>
  );
}
