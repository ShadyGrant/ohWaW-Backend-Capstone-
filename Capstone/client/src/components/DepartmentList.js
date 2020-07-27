import React, { useContext, useEffect } from "react";
import { DepartmentContext } from "../providers/DepartmentProvider";
import Depatment from "./Department";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const DepartmentList = () => {
 
  const { departments, getAllDepartments } = useContext(DepartmentContext);
  const history = useHistory();

  useEffect(() => {
    getAllDepartments();
  }, []);

  return (
    <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {departments.map((department) => (
            <Depatment key={department.id} department={department} />
          ))}
        </div>
      </div>
    </div>

    </>
  );
};

export default DepartmentList;