import React, { useMemo } from "react";
import Table from "../../../../components/Table";
import useGetAllUser from "../../../../hooks/user/useGetAllUser";
import Card from "../../components/Card";
import Container from "../../components/Container";

export default function AllUser() {
  const { data: user } = useGetAllUser();
  const header = ["Fullname", "Email", "User Roles", "status"];
  const displayData = useMemo(() => {
    return user.map((val, i) => (
      <tr className=" border-b border-b-slate-400 text-primary">
        <td className=" py-5 text-secondary">{val.fullname}</td>
        <td className=" text-secondary">{val.email}</td>
        <td className=" capitalize text-secondary">{val.userRoles}</td>
        <td
          className={` ${
            val.status === "1" ? "text-green-600" : "text-red-600"
          }`}
        >
          {val.status === "1" ? "Active" : "Inactive"}
        </td>
      </tr>
    ));
  }, [user]);

  return (
    <Container>
      <div className=" w-1/2 m-auto mt-10">
        <h1 className=" font-bold text-xl mb-10">User Lists</h1>
        <Card>
          <Table header={header}>{displayData}</Table>
        </Card>
      </div>
    </Container>
  );
}
