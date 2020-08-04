import React, { useEffect, useContext, useState } from "react";
import { Card } from "reactstrap"
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "../providers/ProductProvider";


const NewsFeedProductDetails = () => {

    const { id } = useParams();

    const { getProduct } = useContext(ProductContext);
    const [product, setProduct] = useState({ userProfile: {} });

    useEffect(() => {
        getProduct(id).then((product) => {
            setProduct(product);
        });
    }, []);

    return (
        <>
            <Card className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-lg-6">
                        <p className="prodcut-details-publishDate"> {product.createDateTime}</p>
                        <div><img src={product.imageLocation} alt="" className="product-details-image" /></div>
                        <p className="product-details-title"><b>{product.title}</b></p>
                        <p className="product-details-description">{product.description}</p>
                        <p className="product-details-price"><b>Price: </b> ${product.price}</p>
                        <p className="product-details-websiteURL"><b>Website Link: </b> <a href={product.websiteURL}>{product.websiteURL}</a></p>
                        <Link to={`/comments/${id}`} type="button" class="btn btn-info" value="View Comments" size="sm">
                            View Comments
          </Link>
                    </div>
                </div>

            </Card>
            <Link to={`/`} type="button" class="btn btn-info" value="Back to News Feed" size="sm">
                Back to News Feed
          </Link>
        </>
    );
};
export default NewsFeedProductDetails;