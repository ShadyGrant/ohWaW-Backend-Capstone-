import React, { useState, useContext, useEffect } from "react";
import { Card, Modal, ModalBody, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { DepartmentContext } from "../providers/DepartmentProvider";
import Product from "./Product";
import { ProductContext } from "../providers/ProductProvider";


const Department = ({ department }) => {
  const { departments, getAllDepartments } = useContext(DepartmentContext);
  const { getProductsByDepartmentId } = useContext(ProductContext);

  const [departmentProductModal, setDepartmentProductModal] = useState(false);
  const [productsByDepartment, setProductsByDepartment] = useState([]);

  
  const toggleDepartmentProducts = () => {
    setDepartmentProductModal(!departmentProductModal);
 
    getProductsByDepartmentId(department.id).then(setProductsByDepartment);
  };

  return (
    <>
      <Card className="m-4">
        <p className="text-left px-2">{department.name}</p>
        <Button onClick={() => toggleDepartmentProducts()}>View Products</Button>
      </Card>
      <Modal isOpen={departmentProductModal} toggle={toggleDepartmentProducts}>
        <ModalBody>
          <div className="row justify-content-center">
            <div className="cards-column">
              {productsByDepartment.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  setDepartmentProducttModal={setDepartmentProductModal} 
                  departmentProductModal={departmentProductModal}
                />
              ))}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Department;