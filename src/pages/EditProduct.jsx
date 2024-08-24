import { useEffect, useState } from 'react';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const { Option } = Select;

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`)
      .then(response => {
        setProduct(response.data);
        form.setFieldsValue({
          ...response.data,
          expiryDate: moment(response.data.expiryDate),
        });
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });
  }, [id, form]);

  const onFinish = (values) => {
    axios.put(`http://localhost:3000/products/${id}`, values)
      .then(() => {
        message.success('Product updated successfully');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch(() => {
        message.error('Failed to update product');
      });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <h2 className="text-[30px] font-bold mb-4">Edit Product: <span className='capitalize !font-normal'>{product.name}</span></h2>
      <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item label="Product Name" name="name" rules={[{ required: true, message: 'Please input product name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input product price!' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Expiry Date" name="expiryDate" rules={[{ required: true, message: 'Please input expiry date!' }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="Origin" name="origin" rules={[{ required: true, message: 'Please select the origin!' }]}>
          <Select>
            <Option value="USA">USA</Option>
            <Option value="China">China</Option>
            <Option value="India">India</Option>
            <Option value="Germany">Germany</Option>
            <Option value="Brazil">Brazil</Option>
            <Option value="Australia">Australia</Option>
            <Option value="Canada">Canada</Option>
            <Option value="France">France</Option>
            <Option value="Italy">Italy</Option>
            <Option value="Russia">Russia</Option>
            <Option value="Japan">Japan</Option>
            <Option value="UK">UK</Option>
            <Option value="Mexico">Mexico</Option>
            <Option value="South Korea">South Korea</Option>
            <Option value="South Africa">South Africa</Option>
            <Option value="Argentina">Argentina</Option>
            <Option value="Saudi Arabia">Saudi Arabia</Option>
            <Option value="Spain">Spain</Option>
            <Option value="Turkey">Turkey</Option>
            <Option value="Egypt">Egypt</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select the type!' }]}>
          <Select>
            <Option value="Fruits">Fruits</Option>
            <Option value="Vegetables">Vegetables</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input a description!' }]}>
          <Input.TextArea />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Update Product
        </Button>
      </Form>
    </div>
  );
};

export default EditProduct;
