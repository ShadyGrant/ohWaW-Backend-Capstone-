import React, { useState, useContext, useEffect } from "react";
import { useHistory, Route } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { ProductContext } from "../providers/ProductProvider";
import { DepartmentContext } from "../providers/DepartmentProvider";

export default function NewProductForm() {
  const history = useHistory();
  const { addProduct } = useContext(ProductContext);
  const { departments, getAllDepartments } = useContext(DepartmentContext);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [websiteURL, setWebsiteURL] = useState();
  const [imageLocation, setImageLocation] = useState();
  const [price, setPrice] = useState();
  const [department, setDepartment] = useState();

  useEffect(() => {
    getAllDepartments();
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (!title) {
      window.alert("You forgot to enter a title!");
    } else if (!description) {
      window.alert("You forgot to enter product's description!");
    } else if (!websiteURL) {
      window.alert("You forgot to enter the websiteURL!");
    } else if (!imageLocation) {
      window.alert("You forgot to enter the imageURL!");
    } else if (!price) {
      window.alert("You forgot to enter a price!");
    } else if (!department) {
      window.alert("You forgot to select a department!");
    } else {
      const NewProduct = {
        title: title,
        description: description,
        departmentId: parseInt(department),
        websiteURL: websiteURL,
        createDateTime: new Date(),
        imageLocation: imageLocation,
        price: price,
      };

      addProduct(NewProduct)
        .then((p) => history.push(`/products/${p.id}`))
        .catch((err) => alert(`An error ocurred: ${err.message}`));
    }
  };

  return (
    <Form onSubmit={submitForm}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          placeholder="Title"
          id="new-product-title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleSelect">Select Department</Label>
        <Input
          type="select"
          name="select"
          id="new-product-department"
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option key="0" value="0">
            Select Department
          </option>
          {departments.map((d) => (
            <option value={d.id} key={d.id}>
              {d.name}
            </option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="new-product-description">Description</Label>
        <Input
          placeholder="Description"
          id="new-product-description"
          type="textarea"
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="new-product-price">Price $</Label>
        <Input
          placeholder="Price"
          id="new-product-price"
          type="text"
          onChange={(e) => setPrice(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="imageLocation">Image Url</Label>
        <Input
          type="text"
          name="imageLocation"
          id="new-product-image-url"
          placeholder="Image Url"
          onChange={(e) => setImageLocation(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="websiteURL">Website Link</Label>
        <Input
          type="text"
          name="websiteURL"
          id="new-product-wesbite-url"
          placeholder="Website Url"
          onChange={(e) => setWebsiteURL(e.target.value)}
        />
      </FormGroup>


      <FormGroup>
        <Button color="success">Save</Button>
      </FormGroup>
    </Form>
  );
}