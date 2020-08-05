import React, { useContext, useEffect, useState } from "react";
import { RatingContext } from "../providers/RatingProvider";
import Rating from "./Rating";
import { ProductContext } from "../providers/ProductProvider";
import { useParams, Link } from "react-router-dom";
import { Button } from "reactstrap"
import { useHistory } from "react-router-dom";



const RatingList = () => {


    const [product, setProduct] = useState({})
    const { ratings, getRatingsByProductId, averageRatings } = useContext(RatingContext)
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
                    <p className="product-details-overall-rating"><b>Overall Rating:</b> {averageRatings} </p>
                    <div class="col-md-12 text-center">
                    <Button color="primary" onClick={() => history.push(`/newrating/${product.id}`)} >Add Rating</Button>
                    </div>
                    {ratings.map((rating) => (
                        <Rating key={rating.id} rating={rating} productId={id} />
                    ))}
                    <br></br>
                    <br></br>
                    <br></br>
                    <Link to={`/`} type="button" class="btn btn-dark" value="Back to NewsFeed" size="sm">
                        Back to News Feed
          </Link>
                    <Link to={`/products/${id}`} type="button" class="btn btn-secondary" value="Back to Posts" size="sm">
                        Back to Product
          </Link>


                </div>
            </div>
        </div>
    );
};

export default RatingList;