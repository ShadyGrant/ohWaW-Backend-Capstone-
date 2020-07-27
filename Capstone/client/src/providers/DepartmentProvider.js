import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const DepartmentContext = React.createContext();

export const DepartmentProvider = (props) => {

  const apiUrl = "/api/department";
  const [departments, setDepartments] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getAllDepartments = () => {
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setDepartments));
  }

  const getDepartmentById = (id) =>
    getToken().then((token) =>
      fetch(`/api/department/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()));

  return (
    <DepartmentContext.Provider value={{ departments, getAllDepartments, getDepartmentById }}>
      {props.children}
    </DepartmentContext.Provider>
  );
};