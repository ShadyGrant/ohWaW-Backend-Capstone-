import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "../providers/CommentProvider";
import Comment from "./Comment";
import { ProductContext } from "../providers/ProductProvider";
import { useParams, Link } from "react-router-dom";
import { Button, Modal, ModalBody } from "reactstrap"
import { useHistory } from "react-router-dom";



const CommentList = () => {

    const [product, setProduct] = useState({})
    const { comments, getCommentsByProductId } = useContext(CommentContext)
    const { getProduct } = useContext(ProductContext)

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        getCommentsByProductId(id);
        getProduct(id).then(setProduct)
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-center">


                <div className="cards-column">
                    <p className="product-details-title"><b>Product Title: </b> {product.title}</p>
                    <Button onClick={() => history.push(`/newcomment/${product.id}`)} >Add Comment</Button>

                    {comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} productId={id} />
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

export default CommentList;