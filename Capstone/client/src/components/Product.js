import React, { useState, useContext, useEffect } from "react";
import { Card, CardImg, CardBody, Button, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import { ProductContext } from "../providers/ProductProvider";
import { DepartmentContext } from "../providers/DepartmentProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { useHistory } from "react-router-dom";

const Product = ({ product }) => {
    const history = useHistory();

    const { userProfile } = useContext(UserProfileContext);
    
    return (
        <>
            <Card className="m-4">
                <p className="text-left px-2">
                    Posted by <b>{product.userProfile.displayName}</b>
                </p>
                <CardBody>
                    <img src={product.imageLocation} className="product-image" />
                    <p><b>{product.title}</b></p>
                    <p>{product.description}</p>
                </CardBody>
                <Link to={`/products/${product.id}`} type="button" class="btn btn-info" value="View Post Details" size="sm">
                    View Product Details
          </Link>
                <Link to={`/comments/`} type="button" class="btn btn-info" value="View Comments" size="sm">
                    View Comments
          </Link>
            </Card>
        </>
    );
};

export default Product;