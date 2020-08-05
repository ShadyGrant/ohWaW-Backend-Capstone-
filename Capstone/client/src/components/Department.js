import React from "react";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";


const Department = ({ department }) => {


    return (
        <>
            <Card className="m-4">
                <p className="text-left px-2">{department.name}</p>
                <Link type="button" className="btn btn-primary" value="View Post Details" size="sm">
                    View Products
          </Link>
            </Card>
        </>
    );
};

export default Department;