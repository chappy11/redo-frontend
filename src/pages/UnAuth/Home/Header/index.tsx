import { FaArrowRight } from "react-icons/fa";
import { RoutesPath } from "../../../../types/RoutesPath.enum";

export default function Header() {
  function handleGotoLogin() {
    window.location.href = RoutesPath.LOGIN;
  }

  return (
    <header className="background flex w-screen h-screen justify-center items-center flex-col">
      <div className=" p-6">
        <h3 className=" text-white text-4xl text-center mb-6">
          Don't worry about it
        </h3>
        <h1 className=" text-white text-6xl text-center font-bold mb-14">
          GET IT DONE WITH US
        </h1>
        <h4 className=" text-white text-center text-2xl ">
          Simple, affordable and memorable
        </h4>
        <div className=" mt-16 flex  justify-center">
          <button
            className=" py-4 px-3 text-secondary text-2xl bg-white rounded-lg w-3/4 self-center flex justify-center items-center hover:bg-green-500 hover:text-white"
            onClick={handleGotoLogin}
          >
            Get Started <FaArrowRight className=" w-10" />
          </button>
        </div>
      </div>
    </header>
  );
}
