import React, { useEffect, useContext, useState, useRef } from "react";
import { Button, Modal, ModalBody, Card } from "reactstrap"
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "../providers/ProductProvider";
import { DepartmentContext } from "../providers/DepartmentProvider";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";




const ProductDetails = () => {

    const { id } = useParams();
    const history = useHistory();


    const { departments, getAllDepartments } = useContext(DepartmentContext);
    const { getProduct, updateProduct, deleteProduct } = useContext(ProductContext);
    const [product, setProduct] = useState({ userProfile: {} });

    const { getUserFromSession } = useContext(UserProfileContext);
    const userFromSession = getUserFromSession()
    const theUserProfile = JSON.parse(userFromSession);

    useEffect(() => {
        getProduct(id).then((product) => {
            setProduct(product);
        });
    }, []);


    const titleRef = useRef();
    const descriptionRef = useRef();
    const websiteURLRef = useRef();
    const imageLocationRef = useRef();
    const priceRef = useRef();
    const departmentIdRef = useRef();


    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);


    const toggleDelete = () => {
        setDeleteModal(!deleteModal);
    };

    const toggleEdit = () => {
        setEditModal(!editModal)
    };


    const submitForm = () => {


        const theProduct = {
            id: parseInt(id),
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            departmentId: parseInt(departmentIdRef.current.value),
            imageLocation: imageLocationRef.current.value,
            websiteURL: websiteURLRef.current.value,
            price: priceRef.current.value,
            createDateTime: product.createDateTime

        }
        updateProduct(theProduct)
            .then(() => getProduct(id))
            .then((product) => {
                setProduct(product)
            });
    };

    if (!product) {
        return null;
    }

    return (
        <>
            <Link to={`/newrating/${product.id}`} type="button" class="btn btn-info" value="View Comments" size="sm">
                Rate Product
          </Link>
          <Link to={`/ratings/${product.id}`} type="button" class="btn btn-info" value="View Comments" size="sm">
                View Ratings
          </Link>
            <Card className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-lg-6">
                        {/* <p className="prodcut-details-publishDate"> {product.createDateTime}</p> */}
                        <p className="product-details-postedBy"><b>Posted By: </b> {product.userProfile.displayName}</p>
                        <div><img src={product.imageLocation} className="product-details-image" /></div>
                        <p className="product-details-title"><b>{product.title}</b></p>
                        <p className="product-details-description">{product.description}</p>
                        <p className="product-details-price"><b>Price: </b> ${product.price}</p>
                        <p className="product-details-websiteURL"><b>Website Link: </b> <a href={product.websiteURL}>{product.websiteURL}</a></p>
                        {product.userProfileId === theUserProfile.id && (

                            <Button onClick={toggleEdit}>Edit</Button>

                        )}
                        {product.userProfileId === theUserProfile.id && (

                            <Button onClick={toggleDelete}>Delete</Button>

                        )}
                        <Link to={`/comments/${id}`} type="button" class="btn btn-info" value="View Comments" size="sm">
                            View Comments
          </Link>

                    </div>
                </div>

            </Card>
            <Link to={`/`} type="button" class="btn btn-info" value="Back to News Feed" size="sm">
                Back to News Feed
          </Link>

            <Modal isOpen={deleteModal} toggle={toggleDelete}>
                <ModalBody>
                    <div className="form-group">
                        <h3>Do you want to delete product "{product.title}"?</h3>
                        <div className="">
                            <Button
                                type="submit"
                                size="sm"
                                color="info"
                                onClick={(e) => {
                                    e.preventDefault();
                                    deleteProduct(product.id).then(() => history.push(`/`));
                                }}
                                className="btn mt-4"
                            >
                                Yes
              </Button>
                            <Button
                                type="submit"
                                size="sm"
                                color="info"
                                onClick={toggleDelete}
                            >
                                No
              </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            <Modal isOpen={editModal} toggle={toggleEdit}>
                <ModalBody>
                    <div className="form-group">
                        <label htmlFor="title">Title: </label>
                        <input
                            type="text"
                            id="title"
                            ref={titleRef}
                            required
                            autoFocus
                            className="form-control mt-4"
                            defaultValue={product.title}
                        />

                        <label htmlFor="department">Department: </label>
                        <select
                            id="department"
                            ref={departmentIdRef}
                            required
                            autoFocus
                            className="form-control mt-4"
                            defaultValue={product.departmentId}
                        >
                            <option key="0" value="0">Select Department</option>
                            {departments.map(d => (
                                <option value={d.id} key={d.id} >
                                    {d.name}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="description">Description: </label>
                        <input
                            type="textarea"
                            id="description"
                            ref={descriptionRef}
                            autoFocus
                            className="form-control mt-4"
                            defaultValue={product.description}
                        />

                        <label htmlFor="price">Price: $</label>
                        <input
                            type="text"
                            id="price"
                            ref={priceRef}
                            required
                            autoFocus
                            className="form-control mt-4"
                            defaultValue={product.price}
                        />

                        <label htmlFor="imageLocation">Image URL: </label>
                        <input
                            type="text"
                            id="imageLocation"
                            ref={imageLocationRef}
                            autoFocus
                            className="form-control mt-4"
                            defaultValue={product.imageLocation}
                        />

                        <label htmlFor="websiteURL">Website Link: </label>
                        <input
                            type="text"
                            id="websiteURL"
                            ref={websiteURLRef}
                            autoFocus
                            className="form-control mt-4"
                            defaultValue={product.websiteURL}
                        />




                        <div className="">
                            <Button
                                type="submit"
                                size="sm"
                                color="info"
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    if (!descriptionRef.current.value) {
                                        window.alert("You forgot to enter description!")
                                    }
                                    else if (!titleRef.current.value) {
                                        window.alert("You forgot a title!")
                                    }
                                    else if (!departmentIdRef.current.value) {
                                        window.alert("You forgot a department!")
                                    }
                                    else {
                                        submitForm(product);
                                        toggleEdit();
                                    }
                                }}
                                className="btn mt-4"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>


        </>
    );
};
export default ProductDetails;