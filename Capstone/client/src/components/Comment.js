import React, { useContext, useState, useRef } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { CommentContext } from "../providers/CommentProvider";
import { Card, CardBody, Button, Modal, ModalBody } from "reactstrap";
import { useHistory } from "react-router-dom";


//using the Card component that comes with reactstrap to organize some of the post details
const Comment = ({ comment, productId }) => {
    const [theComment, setTheComment] = useState(comment);

    const history = useHistory();
    const { getUserFromSession } = useContext(UserProfileContext);
    const { updateComment } = useContext(CommentContext);
    const { deleteComment } = useContext(CommentContext);
    const userFromSession = getUserFromSession()
    const theUserProfile = JSON.parse(userFromSession);


    const content = useRef();

    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const toggleEdit = () => {
        setEditModal(!editModal);
    };
    const toggleDelete = () => {
        setDeleteModal(!deleteModal)
    };

    const submitForm = () => {
        updateComment({
            id: comment.id,
            content: content.current.value,
            productId: parseInt(productId),
            userProfileId: theUserProfile.id,
            createDateTime: comment.createDateTime
        })
    };

    if (!comment) {
        return null;
    }

    return (
        <>
            <Card className="m-4">
                <p className="comment-creationDate"><b>Comment Date: </b> {comment.createDateTime.substr(0, 10)}</p>
                <p className="text-left px-2">{comment.userProfile.displayName}</p>
                <CardBody>
                    <p className="comment-content"><b>Conetnt: </b>{theComment.content}</p>
                    {comment.userProfileId === theUserProfile.id && (

                        <Button onClick={toggleEdit}>Edit</Button>

                    )}
                    {comment.userProfileId === theUserProfile.id && (

                        <Button onClick={toggleDelete}>Delete</Button>

                    )}
                </CardBody>

            </Card>

            <Modal isOpen={editModal} toggle={toggleEdit}>
                <ModalBody>
                    <div className="form-group">

                        <label htmlFor="content">Content: </label>
                        <input
                            type="text-area"
                            id="content"
                            ref={content}
                            required
                            autoFocus
                            className="form-control mt-4"
                            defaultValue={theComment.content}
                        />

                        <div className="">
                            <Button
                                type="submit"
                                size="sm"
                                color="info"
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    if (content.current.value === "") {
                                        window.alert("You forgot to enter content!");
                                    } else {

                                        submitForm(comment);
                                        setTheComment({
                                            id: comment.id,
                                            content: content.current.value,
                                            productId: parseInt(productId),
                                            userProfileId: theUserProfile.id,
                                            createDateTime: comment.createDateTime
                                        })
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

            <Modal isOpen={deleteModal} toggle={toggleDelete}>
                <ModalBody>
                    <div className="form-group">
                        <h3>
                            Are you sure you want to delete this comment?
                    </h3>
                        <div className="">
                            <Button
                                type="submit"
                                size="sm"
                                color="danger"
                                onClick={(e) => {
                                    e.preventDefault();
                                    deleteComment(comment.id)
                                        .then(() => history.push(`/comments/:id`));}
                                        
                                }
                                
                                className="btn mt-4"
                            >
                                Yes
              </Button>
                            <Button
                                type="submit"
                                size="sm"
                                color="info"
                                onClick={toggleDelete}>
                                No
              </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>

    )


}
export default Comment;

