import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";

//using the Card component that comes with reactstrap to organize some of the post details
const Rating = ({ rating }) => {
    const [theRating] = useState(rating);

    if (!rating) {
        return null;
    }

    return (
        <>

            <Card className="m-4">
                <p className="text-left px-2">Rated by: {rating.userProfile.displayName}</p>
                <CardBody>
                    <p className="rate">{theRating.rate}/5</p>
                </CardBody>
            </Card>


        </>

    )


}
export default Rating;

