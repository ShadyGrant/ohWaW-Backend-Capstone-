import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const ProductContext = React.createContext();

export const ProductProvider = (props) => {
    const apiUrl = "/api/product";
    const [products, setProducts] = useState([]);

    const { getToken } = useContext(UserProfileContext);

    const getAllProducts = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((resp) => resp.json())
                .then(setProducts)
        );


    const getProduct = (id) =>
        getToken().then((token) =>
            fetch(`/api/product/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json())
        );

    const addProduct = (product) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            }).then((resp) => {
                return resp.json();
            })
        );

    const getProductsByUser = () => {
        getToken().then((token) =>
            fetch(`${apiUrl}/getbyuser`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((resp) => resp.json())
                .then(setProducts)
        );
    };

    const getProductsByDepartmentId = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/getbydepartment/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((resp) => resp.json())
        );
    };
    const updateProduct = (product) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${product.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            }).then(getProduct(product.id))
        );

    const deleteProduct = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }).then(getAllProducts)
        );
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                getAllProducts,
                getProductsByUser,
                getProduct,
                addProduct,
                updateProduct,
                deleteProduct,
                getProductsByDepartmentId,
            }}
        >
            {props.children}
        </ProductContext.Provider>
    );
};