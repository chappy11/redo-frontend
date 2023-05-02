import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../../components";
import Table from "../../../../components/Table";
import useGetUserByStatus from "../../../../hooks/user/useGetUserByStatus";
import Card from "../../components/Card";
import Container from "../../components/Container";
import { updatestatus } from "../../../../service/User";
import useAlertOptions from "../../../../hooks/useAlertOptions";

export default function UserWithStatus() {
  const { status } = useParams();
  const { data: user, handleRequest } = useGetUserByStatus({
    status: status ? status : "0",
  });
  const { alertSuccess, alertError } = useAlertOptions();
  const displayCurrentPageHeader = useMemo(() => {
    if (status === "0") {
      return "Inactive Users";
    }

    return "Active Users";
  }, [status]);

  const handleUpdateStatus = useCallback(async (id: string, status: string) => {
    try {
      const currentStatus = status === "1" ? "0" : "1";
      const payload = {
        user_id: id,
        status: currentStatus,
      };
      const resp = await updatestatus(payload);
      if (resp.data.status === 1) {
        handleRequest(status);
        alertSuccess(resp.data.message);

        return;
      }

      alertError();
    } catch (error) {
      console.log(error);
      alertError();
    }
  }, []);

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
            onClick={() => handleUpdateStatus(val.user_id, val.status)}
          >
            {val.status === "0" ? "Activate" : "Deactivate"}
          </Button>
        </td>
      </tr>
    ));
  }, [user, handleUpdateStatus]);

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
