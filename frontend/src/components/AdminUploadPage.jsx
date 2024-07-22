import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button, Input, Upload, Select, Form as AntForm } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

const { Option } = Select;

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
          <AntForm.Item label="Title">
            <Field name="title" as={Input} />
            <ErrorMessage
              name="title"
              component="div"
              style={{ color: 'red' }}
            />
          </AntForm.Item>

          <AntForm.Item label="Description">
            <Field name="description" as={Input.TextArea} />
            <ErrorMessage
              name="description"
              component="div"
              style={{ color: 'red' }}
            />
          </AntForm.Item>

          <AntForm.Item label="Category">
            <Field name="category" as={Select} defaultValue="">
              <Option value="" disabled>
                Select a category
              </Option>
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Field>
            <ErrorMessage
              name="category"
              component="div"
              style={{ color: 'red' }}
            />
          </AntForm.Item>

          <AntForm.Item label="File">
            <Upload
              beforeUpload={(file) => {
                setFieldValue('file', file);
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            <ErrorMessage
              name="file"
              component="div"
              style={{ color: 'red' }}
            />
          </AntForm.Item>

          <AntForm.Item label="Image">
            <Upload
              beforeUpload={(file) => {
                setFieldValue('image', file);
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
            <ErrorMessage
              name="image"
              component="div"
              style={{ color: 'red' }}
            />
          </AntForm.Item>

          <Button type="primary" htmlType="submit">
            Upload
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AdminUploadPage;
