import { Suspense, useMemo } from "react";
import { BASE_URL } from "../../../../constant/config";
import { UserInfo } from "../../../../types/User.type";
import { MdLogout } from "react-icons/md";
import { RoutesPath } from "../../../../types/RoutesPath.enum";

type Props = {
  user: UserInfo;
  children: React.ReactNode;
};

export default function Content(props: Props) {
  const displayData = useMemo(() => {
    if (!props.user) {
      return;
    }

    return (
      <div className=" flex items-center">
        <img
          src={BASE_URL + props.user?.profilePic}
          alt="Profile"
          className=" w-10 h-10 bg-gray-600 rounded-full mx-5"
        />
        <p className=" text-white">{props.user.fullname}</p>
        <div className=" text-xl text-white mx-8" onClick={handleLogout}>
          <MdLogout />
        </div>
      </div>
    );
  }, [props.user]);

  function handleLogout() {
    window.localStorage.clear();
    window.location.href = RoutesPath.DASHBOARD;
  }
  return (
    <div className=" w-full bg-slate-300 ml-52">
      <nav className="w-full bg-secondary">
        <ul className=" flex justify-end p-5">
          <li className=" flex">{displayData}</li>
        </ul>
      </nav>

      {props.children}
    </div>
  );
}
