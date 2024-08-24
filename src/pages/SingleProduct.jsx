import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal, message, List, Typography, Divider } from 'antd';
import moment from 'moment';

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/products/${id}`);
    message.success('Product deleted successfully');
    navigate('/');
  };

  const showDeleteModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const productData = [
    { label: 'Price', value: `${product.price} UZS` },
    { label: 'Expiry Date', value: moment(product.expiryDate).format('YYYY-MM-DD') },
    { label: 'Origin', value: product.origin },
    { label: 'Type', value: product.type },
    { label: 'Description', value: product.description }
  ];

  return (
    <div className="product-details p-5">
      <div className='flex items-center gap-3'>
      <h2 className='text-[27px] capitalize font-semibold'>{product.name}</h2>
      <Link to="/" className="back-button">
        <Button>Back</Button>
      </Link>
      </div>
      <Divider orientation="left">Product Details</Divider>
      <List
        bordered
        dataSource={productData}
        renderItem={item => (
          <List.Item>
            <Typography.Text>
              <span className='text-[20px] font-semibold inline'>{item.label}: </span>
              <p className='text-[16px] inline'>{item.value}</p>
            </Typography.Text> 
          </List.Item>
        )}
      />
      <div className="action-buttons mt-5 flex gap-2">
        <Button type="primary" onClick={showDeleteModal}>
          Delete
        </Button>
        <Link to={`/edit-product/${product.id}`}>
          <Button>Edit</Button>
        </Link>
      </div>
      <Modal
        title="Delete Confirmation"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Do you really want to delete this product?</p>
      </Modal>
    </div>
  );
};

export default SingleProduct;
