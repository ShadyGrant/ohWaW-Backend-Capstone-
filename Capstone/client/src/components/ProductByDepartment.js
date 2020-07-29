import React, { useEffect, useContext } from "react";
import { Button } from "reactstrap";
import { DepartmentContext } from "../providers/DepartmentProvider";
import ProductDepartment from "./ProductDepartment";

const ProductByDepartment = () => {
  const { getAllDepartments, departments } = useContext(DepartmentContext);

  useEffect(() => {
    getAllDepartments();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="cards-column">
            {departments.map((department) => (
              <ProductDepartment key={department.id} department={department} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductByDepartment;