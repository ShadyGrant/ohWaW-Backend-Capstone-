import React, { useContext, useEffect, useState } from "react";
import { RatingContext } from "../providers/RatingProvider";
import Rating from "./Rating";
import { ProductContext } from "../providers/ProductProvider";
import { useParams, Link } from "react-router-dom";
import { Button, Modal, ModalBody } from "reactstrap"
import { useHistory } from "react-router-dom";



const RatingList = () => {

    const [product, setProduct] = useState({})
    const { ratings, getRatingsByProductId } = useContext(RatingContext)
    const { getProduct } = useContext(ProductContext)

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        getRatingsByProductId(id);
        getProduct(id).then(setProduct)
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-center">


                <div className="cards-column">
                    <p className="product-details-title"><b>Product Rate:  </b></p>
                    <Button onClick={() => history.push(`/newrating/${product.id}`)} >Add Rating</Button>

                    {ratings.map((rating) => (
                        <Rating key={rating.id} rating={rating} productId={id} />
                    ))}
                    <br></br>
                    <br></br>
                    <br></br>
                    <Link to={`/`} type="button" class="btn btn-info" value="Back to NewsFeed" size="sm">
                        Back to News Feed
          </Link>
                    <Link to={`/products/${id}`} type="button" class="btn btn-info" value="Back to Posts" size="sm">
                        Back to Post
          </Link>
          

                </div>
            </div>
        </div>
    );
};

export default RatingList;