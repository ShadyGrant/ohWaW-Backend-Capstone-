import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {

  const apiUrl = "/api/comment";
  const [comments, setComments] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getComment = (id) => {
    return getToken().then((token) =>
        fetch(apiUrl + `/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json()));
};


      const getCommentsByProductId = (id) =>
      getToken().then((token) =>
        fetch(apiUrl + `/getbyproduct/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((res) =>setComments(res))
      );

  const getAllComments = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setComments));

  const getCommentById = (id) =>
    getToken().then((token) =>
      fetch(`/api/post/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()));


  const addComment = (comment) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
      }));

      const updateComment = (comment) =>
      getToken().then((token) =>
        fetch(`${apiUrl}/${comment.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        }).then(getComment(comment.id))
      );

      const deletecomment = (id) => {
        return getToken().then((token) =>
          fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }).then(getAllComments)
        );
      };

  
 




  return (
    <CommentContext.Provider value={{ comments, getCommentById, addComment, getAllComments, getCommentsByProductId, updateComment, deletecomment }}> 
      {props.children}
    </CommentContext.Provider>
  );
};