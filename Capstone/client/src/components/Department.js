import React, { useState, useContext } from "react";
import { Card, Modal, ModalBody, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { DepartmentContext } from "../providers/DepartmentProvider";

const Department = ({ department }) => {
    const history = useHistory()

    return (
        <>
            <Card className="m-4">
                <p className="text-left px-2">{department.name}</p>
                <Link type="button" class="btn btn-info" value="View Post Details" size="sm">
                    View Products
          </Link>
            </Card>
        </>
    );
};

export default Department;