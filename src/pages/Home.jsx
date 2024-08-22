import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Input } from "antd";
import { Link } from "react-router-dom";
import moment from 'moment';


const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  

  const capitalizeFirstLetter = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:3000/products");
    setProducts(response.data);
    setFilteredProducts(response.data);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    const filteredData = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filteredData);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/products/${id}`);
    fetchProducts();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filterDropdown: () => (
        <Input
          placeholder="Search Name"
          value={searchText}
          onChange={handleSearch}
        />
      ),
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (text) => `${text} UZS`,
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (expiryDate) => moment(expiryDate).format('YYYY-MM-DD'),
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: [
        { text: "Fruits", value: "fruits" },
        { text: "Vegetables", value: "vegetables" },
        { text: "Other", value: "other" },
      ],
      onFilter: (value, record) => record.type.includes(value),
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
          <Link to={`/product/${record.id}`}>
            <Button type="primary">More</Button>
          </Link>

        </div>
      ),
    },

  ];

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">All Products</h2>
          <p>Products ({filteredProducts.length})</p>
        </div>
        <Link to="/add-product">
          <Button type="primary">Add Product</Button>
        </Link>
      </div>
      <Table
        dataSource={filteredProducts}
        pagination={{
          pageSize: 8,
          hideOnSinglePage: true,
        }}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};

export default Home;
