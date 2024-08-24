import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Input, Select, Row, Col } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

const { Option } = Select;


const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterOrigin, setFilterOrigin] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const capitalizeFirstLetter = (text) => text.charAt(0).toUpperCase() + text.slice(1);

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
    filterData(e.target.value, filterType, filterOrigin);
  };

  const handleFilterType = (value) => {
    setFilterType(value);
    filterData(searchText, value, filterOrigin);
  };

  const handleFilterOrigin = (value) => {
    setFilterOrigin(value);
    filterData(searchText, filterType, value);
  };

  const filterData = (searchText, filterType, filterOrigin) => {
    let filteredData = products;

    if (searchText) {
      filteredData = filteredData.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterType) {
      filteredData = filteredData.filter((product) => product.type === filterType);
    }

    if (filterOrigin) {
      filteredData = filteredData.filter((product) => product.origin === filterOrigin);
    }

    setFilteredProducts(filteredData);
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
          <Link to={`/edit-product/${record.id}`}>
            <Button>Edit</Button>
          </Link>
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
          <h2 className="text-2xl font-bold">All Product</h2>
          <p>Products ({filteredProducts.length})</p>
        </div>
        <Link to="/add-product">
          <Button type="primary">Add Product</Button>
        </Link>
      </div>
      <Row gutter={16} className="mb-4">
        <Col span={8}>
          <Input
            placeholder="Search by Name"
            value={searchText}
            onChange={handleSearch}
            allowClear
          />
        </Col>
        <Col span={8}>
          <Select
            placeholder="Filter by Type"
            onChange={handleFilterType}
            style={{ width: "100%" }}
            allowClear
          >
            <Option value="fruits">Fruits</Option>
            <Option value="vegetables">Vegetables</Option>
            <Option value="other">Other</Option>
          </Select>
        </Col>
        <Col span={8}>
          <Select
            placeholder="Filter by Origin"
            onChange={handleFilterOrigin}
            style={{ width: "100%" }}
            allowClear
          >
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
        </Col>
      </Row>
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
