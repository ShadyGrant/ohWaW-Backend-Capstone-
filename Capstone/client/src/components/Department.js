import React from "react";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";


const Department = ({ department }) => {


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