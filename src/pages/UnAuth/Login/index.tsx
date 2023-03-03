import React from "react";
import { Navigation } from "../../../components";
import LoginComponent from "./LoginComponent";

export default function Login() {
  return (
    <div className=" w-screen h-screen">
      <Navigation />
      <LoginComponent />
    </div>
  );
}
