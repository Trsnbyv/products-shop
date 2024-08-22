import { Form, Input, Button, Select, DatePicker, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AddProduct = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    axios.post('http://localhost:3000/products', values)
      .then(() => {
        message.success('Successfully added');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch(() => {
        message.error('Failed to add product');
      });
  };

  return (
    <div className="p-5">
   <h2 className="text-2xl mb-4">Add Product</h2>
    <Form layout="vertical" onFinish={onFinish} autoComplete="off">
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
        Add Product
      </Button>
    </Form>
    </div>
  );
};

export default AddProduct;
