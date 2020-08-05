import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {


    return (
        <>
            <Card className="m-4">
                <p className="text-left px-2">
                    Posted by <b>{product.userProfile.displayName}</b>
                </p>
                <CardBody>
                    <img src={product.imageLocation} alt="" className="product-image" />
                    <p><b>{product.title}</b></p>
                    <p>{product.description}</p>
                </CardBody>
                <Link to={`/products/${product.id}`} type="button" className="btn btn-primary" value="View Post Details" size="sm">
                    View Product Details
          </Link>
          <br></br>
                <Link to={`/comments/${product.id}`} type="button" className="btn btn-info" value="View Comments" size="sm">
                    View Comments
          </Link>
            </Card>
        </>
    );
};

export default Product;