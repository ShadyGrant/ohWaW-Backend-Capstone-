import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { RatingContext } from "../providers/RatingProvider";

export default function NewRatingForm() {
    const history = useHistory();
    const { addRating } = useContext(RatingContext);

    const { id } = useParams();

    const [rate, setRate] = useState();

    const submitForm = (e) => {
        e.preventDefault();
        if (!rate) {
            window.alert("You forgot to select a rating!");
        } else {
            const NewRating = {
                rate: rate,
                productId: parseInt(id)
            };
            addRating(NewRating)
                .then(() => history.push(`/ratings/${id}`))
                .catch((err) => alert(`An error ocurred: ${err.message}`));
        }
    };

    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="RatingSelect">Select a Rating</Label>
                <Input
                    type="select"
                    name="select"
                    id="rating"
                    onChange={(e) => setRate(e.target.value)}
                >
                    <option key="0" value="0">
                        Select Rating
          </option>
                    <option key="1" value="1">
                        1
          </option>
                    <option key="2" value="2">
                        2
          </option>
                    <option key="3" value="3">
                        3
          </option>
                    <option key="4" value="4">
                        4
          </option>
                    <option key="5" value="5">
                        5
          </option>

          ))
        </Input>
            </FormGroup>

            <FormGroup>
                <Button color="success">Save</Button>
            </FormGroup>
        </Form>
    );
}