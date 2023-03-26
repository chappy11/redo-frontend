import React from "react";
import Table from "../../components/Table";
import Card from "./components/Card";
import Container from "./components/Container";
import SideBar from "./components/SideBar";

const MOCK = [
  {
    fullname: "GG",
    email: "dsf",
  },
  {
    fullname: "GG",
    email: "dsf",
  },
  {
    fullname: "GG",
    email: "dsf",
  },
  {
    fullname: "GG",
    email: "dsf",
  },
  {
    fullname: "GG",
    email: "dsf",
  },
];

const headers = ["Fullname", "Email"];

const keys = ["fullname", "email"];

export default function Admin() {
  return (
    <div>
      <Container>
        <div className=" m-auto w-3/4 mt-16">
          <h1 className=" text-2xl font-bold text-primary">Dashboard</h1>
          <div className=" h-5" />
          <Card>
            <p>Dasboard</p>
            {/* <Table header={headers} keys={keys} data={MOCK} /> */}
          </Card>
        </div>
      </Container>
    </div>
  );
}
