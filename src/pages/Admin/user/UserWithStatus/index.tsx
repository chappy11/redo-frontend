import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../../components";
import Table from "../../../../components/Table";
import useGetUserByStatus from "../../../../hooks/user/useGetUserByStatus";
import Card from "../../components/Card";
import Container from "../../components/Container";

export default function UserWithStatus() {
  const { status } = useParams();
  const { data: user } = useGetUserByStatus({ status: status ? status : "0" });
  const displayCurrentPageHeader = useMemo(() => {
    if (status === "0") {
      return "Inactive Users";
    }

    return "Active Users";
  }, [status]);

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
        <td>
          <Button
            backgroundColor={val.status === "0" ? "bg-green-600" : "bg-red-600"}
          >
            {val.status === "0" ? "Activate" : "Deactivate"}
          </Button>
        </td>
      </tr>
    ));
  }, [user, status]);

  return (
    <Container>
      <div className=" w-3/4 m-auto mt-10">
        <h1 className=" text-xl font-bold mb-10">{displayCurrentPageHeader}</h1>
        <Card>
          <Table
            header={["Fullname", "Email", "User Roles", "Status", "Action"]}
          >
            {displayData}
          </Table>
        </Card>
      </div>
    </Container>
  );
}
