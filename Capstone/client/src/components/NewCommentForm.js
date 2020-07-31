import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { CommentContext } from "../providers/CommentProvider";

export default function NewCommentForm() {
    const history = useHistory();
    const { addComment } = useContext(CommentContext);

    const { id } = useParams();

    const [content, setContent] = useState();

    const submitForm = (e) => {
        e.preventDefault();
        if (!content) {
            window.alert("You forgot to enter content!");
        } else {
            const NewComment = {
                content: content,
                createDateTime: new Date(),
                productId: parseInt(id)
            };
            addComment(NewComment)
                .then(() => history.push(`/comments/${id}`))
                .catch((err) => alert(`An error ocurred: ${err.message}`));
        }
    };

    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="new-product-content">Content</Label>
                <Input
                    placeholder="Content"
                    id="new-product-content"
                    type="textarea"
                    onChange={(e) => setContent(e.target.value)}
                />
            </FormGroup>

            <FormGroup>
                <Button>Save</Button>
            </FormGroup>
        </Form>
    );
}