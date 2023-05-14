import React, { useMemo, useState } from "react";
import Table from "../../../../components/Table";
import useGetAllUser from "../../../../hooks/user/useGetAllUser";
import Card from "../../components/Card";
import Container from "../../components/Container";
import { UserEnum } from "../../../../types/UserEnum.enum";

export default function AllUser() {
  const { data: user } = useGetAllUser();
  const [role,setRoles] = useState<UserEnum|string>('');
  const userData = useMemo(()=>{
    if(role === ''){
      return user;
    }

    return user.filter((val,i)=>{
      return role === val.userRoles
    })
  },[role, user])
  
  
  const header = ["Fullname", "Email", "User Roles", "status"];
  const displayData = useMemo(() => {
    return userData.map((val, i) => (
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
  }, [userData]);

  return (
    <Container>
      <div className=" w-1/2 m-auto mt-10 mb-10">
        <div className=" flex">
          <div className=" flex-1">
            <h1 className=" font-bold text-lg mb-10">User Lists</h1>
          </div>
          <div>
          <select className="  text-lg p-2" onChange={(e)=>setRoles(e.target.value)}>
              <option className=" p-2" value={''}>
                All
              </option>
              <option className=" p-2" value={UserEnum.REPAIRER}>
                {UserEnum.REPAIRER.toUpperCase()}
              </option>
              <option className=" p-2" value={UserEnum.USER}>
              {UserEnum.USER.toUpperCase()}
              </option>
            </select>
          </div>
         
        </div>
       
        <Card>
          <Table header={header}>{displayData}</Table>
        </Card>
      </div>
    </Container>
  );
}
