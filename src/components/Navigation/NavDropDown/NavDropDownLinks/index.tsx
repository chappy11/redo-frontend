import { Link } from "react-router-dom";
import { NavItemTypes } from "../../../../types/NavigationTypes.type";

type Props = NavItemTypes;

export default function NavDropDownLinks(props: Props) {
  const { name } = props;

  function handleClick() {
    if (props.onClick === undefined) return;

    props.onClick();
  }

  return (
    <li
      className=" cursor-pointer py-2 px-3 hover:bg-green-500 hover:text-white"
      onClick={handleClick}
    >
      {" "}
      {name}
    </li>
  );
}
