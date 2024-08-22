import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Descriptions } from 'antd';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    
    <Card title={product.name} className='capitalize'>
       <Link to="/" className='absolute top-3 left-[100px]'>
          <Button type="primary">Back</Button>
        </Link>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Price">${product.price}</Descriptions.Item>
        <Descriptions.Item label="Expiry Date">{product.expiryDate}</Descriptions.Item>
        <Descriptions.Item label="Origin">{product.origin}</Descriptions.Item>
        <Descriptions.Item label="Type">{product.type}</Descriptions.Item>
        <Descriptions.Item label="Description">{product.description}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default SingleProduct;
