import { Link } from "react-router-dom";
import { NavItemTypes } from "../../../../types/NavigationTypes.type";

type Props = NavItemTypes;

export default function NavDropDownLinks(props: Props) {
  const { name, url } = props;
  return (
    <li className=" cursor-pointer py-2 px-3 hover:bg-green-500 hover:text-white">
      {" "}
      <Link to={url} />
      {name}
    </li>
  );
}
