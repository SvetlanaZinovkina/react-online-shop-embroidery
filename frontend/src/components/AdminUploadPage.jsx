import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button, Form as BootstrapForm, Container } from 'react-bootstrap';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  file: Yup.mixed().required('File is required'),
  image: Yup.mixed().required('Image is required'),
});

const AdminUploadPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the server
    axios
      .get('/api/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('category', values.category);
    formData.append('file', values.file);
    formData.append('image', values.image);

    axios
      .post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('File uploaded successfully:', response.data);
        // Handle success (e.g., show a notification, reset the form)
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <Container className="mt-5">
      <Formik
        initialValues={{
          title: '',
          description: '',
          category: '',
          file: null,
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <BootstrapForm.Group controlId="formTitle">
              <BootstrapForm.Label>Title</BootstrapForm.Label>
              <Field name="title" as={BootstrapForm.Control} />
              <ErrorMessage
                name="title"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formDescription">
              <BootstrapForm.Label>Description</BootstrapForm.Label>
              <Field
                name="description"
                as={BootstrapForm.Control}
                as="textarea"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formCategory">
              <BootstrapForm.Label>Category</BootstrapForm.Label>
              <Field name="category" as="select" className="form-control">
                <option value="" label="Select a category" />
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formFile">
              <BootstrapForm.Label>File</BootstrapForm.Label>
              <BootstrapForm.Control
                type="file"
                onChange={(event) => {
                  setFieldValue('file', event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage
                name="file"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="formImage">
              <BootstrapForm.Label>Image</BootstrapForm.Label>
              <BootstrapForm.Control
                type="file"
                onChange={(event) => {
                  setFieldValue('image', event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <Button type="submit" className="mt-3">
              Upload
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AdminUploadPage;
