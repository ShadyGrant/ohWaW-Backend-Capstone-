import React, { useContext, useState, useRef } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { RatingContext } from "../providers/RatingProvider";
import { Card, CardBody, Button, Modal, ModalBody } from "reactstrap";
import { useHistory } from "react-router-dom";


//using the Card component that comes with reactstrap to organize some of the post details
const Rating = ({ rating, productId }) => {
    const [theRating, setTheRating] = useState(rating);

    const history = useHistory();
    const { getUserFromSession } = useContext(UserProfileContext);
    const userFromSession = getUserFromSession()
    const theUserProfile = JSON.parse(userFromSession);


    if (!rating) {
        return null;
    }

    return (
        <>
            <Card className="m-4">
                <p className="text-left px-2">{rating.userProfile.displayName}</p>
                <CardBody>
                    <p className="rate">{theRating.rate}</p>
                </CardBody>
            </Card>

            
        </>

    )


}
export default Rating;

