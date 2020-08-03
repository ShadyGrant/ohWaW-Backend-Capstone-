import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const RatingContext = React.createContext();

export const RatingProvider = (props) => {

    const apiUrl = "/api/rating";
    const [ratings, setRatings] = useState([]);

    const { getToken } = useContext(UserProfileContext);

    const getRating = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()));
    };


    const getRatingsByProductId = (id) =>
        getToken().then((token) =>
            fetch(apiUrl + `/getbyproduct/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((res) => setRatings(res.ratings))
                // .then((res) => console.log(res))
        );

    const getAllRatings = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setRatings));

    const getRatingById = (id) =>
        getToken().then((token) =>
            fetch(`/api/product/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json()));


    const addRating = (rating) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(rating)
            }));


    return (
        <RatingContext.Provider value={{ ratings, getRating, getRatingById, addRating, getAllRatings, getRatingsByProductId }}>
            {props.children}
        </RatingContext.Provider>
    );
};